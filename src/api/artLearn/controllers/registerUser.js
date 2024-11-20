require("dotenv").config();
const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_51Og5cTJ7pz3TsDzfIWpcaLz5zF1CIvNufxvxC95qYeu9Ay34G5eCeD4OyEJi64I4ple15BNiVrEElqmCEaefvYpE00xAtRInFM");

const { Workshop } = require("../../../models/Workshop");
const { User } = require("../../../models/UserProfile");
const { all } = require("axios");

const confiq = (req, res) => {
  res.send({
    publishableKey:"pk_test_51Og5cTJ7pz3TsDzfr8KUrFFeovdGHs9Twln1FzSrz5sVjSkMUTCufwvxbBwRpD4ZLlXmcau0lyUvnvL1j7Q8r97Q006SSFMfx3", // Use your publishable key from .env
  });
};

const createPaymentInrent = async (req, res) => {
  const { paymentData, payeeData } = req.body;
  const { amount, currency } = paymentData;
  const { name, email, userId } = payeeData; // Assuming userId is passed to link to the user record
  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user already has a Stripe customer ID
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      // Create a new Stripe customer if the user doesn't have one
      const stripeCustomer = await stripe.customers.create({
        email,
        name,
      });

      // Save the Stripe customer ID to the user's profile
      user.stripeCustomerId = stripeCustomer.id;
      await user.save();
      stripeCustomerId = stripeCustomer.id;
    }

    // Create the Setup Intent to save the payment method for future use
    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      usage: "off_session",
    });

    // Create the Payment Intent for this transaction
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(amount) * 100, // Convert to cents
      description: `Payment by ${name}`,
      currency,
      receipt_email: email,
      customer: stripeCustomerId, // Link the payment intent to the customer
      automatic_payment_methods: { enabled: true },
    });

    // Send back the client secret for the payment intent and setup intent details
    res.send({
      clientSecret: paymentIntent.client_secret,
      setupIntentSecret: setupIntent.client_secret, // Send setup intent secret for handling payment methods
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { userId, workshopId } = req.params; // ID of the workshop to register for

    // Find the workshop by ID
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already registered (to prevent duplicate entries)
    if (workshop.attendees.includes(userId)) {
      return res.status(400).json({ message: "User already registered for this workshop" });
    }

    // Check if the user already has a Stripe customer ID
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      // Create a new Stripe customer if the user doesn't have one
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });

      // Save the Stripe customer ID to the user's profile
      user.stripeCustomerId = stripeCustomer.id;
      await user.save();
      stripeCustomerId = stripeCustomer.id;
    }

    // Create a Stripe Setup Intent for the user (this could be for saving a payment method)
    const setupIntent = await stripe.setupIntents.create({
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      usage: "off_session",
    });

    // Add the user to the attendees list of the workshop
    workshop.attendees.push(userId);

    // Save the updated workshop
    await workshop.save();

    // Add the workshop ID to the user's attended workshops list (optional)
    user.attendedWorkshops.push(workshopId); // Assuming 'attendedWorkshops' is an array in the User model
    await user.save();

    // Respond with the setup intent and success message
    return res.status(200).json({
      message: "User registered for the workshop successfully",
      setupIntent, // Return the setup intent in the response
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        stripeCustomerId: stripeCustomerId,
      },
      workshop,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  confiq,
  createPaymentInrent,
  registerUser,
};
