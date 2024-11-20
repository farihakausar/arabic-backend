require("dotenv").config();
const mongoose = require("mongoose");
const stripe = require("stripe")("sk_test_51Og5cTJ7pz3TsDzfIWpcaLz5zF1CIvNufxvxC95qYeu9Ay34G5eCeD4OyEJi64I4ple15BNiVrEElqmCEaefvYpE00xAtRInFM");


const { User } = require("../../../models/UserProfile");
const { ArtMarket } = require("../../../models/ArtMarket");

const purchaseMarket = async (req, res) => {
  const { userId, artworkId, price } = req.body;

  try {
    // 1. Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 2. Find the artwork by artworkId
    const artwork = await ArtMarket.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found.' });
    }

    // 3. Check if the user already has a Stripe customer ID
    let stripeCustomerId = user.stripeCustomerId;
    if (!stripeCustomerId) {
      // 4. Create a new Stripe customer if the user doesn't have one
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });

      // Save the Stripe customer ID to the user's profile
      user.stripeCustomerId = stripeCustomer.id;
      await user.save();
      stripeCustomerId = stripeCustomer.id;
    }

    // 5. Create a Stripe Payment Intent for this transaction
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.floor(price) * 100, // Convert the price to cents
      currency: "usd", // Assuming USD as currency, can be modified based on your requirement
      description: `Purchase of artwork ${artwork.title} by ${user.firstName} ${user.lastName}`,
      receipt_email: user.email,
      customer: stripeCustomerId, // Link the payment intent to the customer
      automatic_payment_methods: { enabled: true }, // Enable automatic payment methods
    });

    // 6. Store the purchase in the user's purchase history
    const purchase = {
      artworkId: artwork._id,
      purchaseDate: new Date(),
      price: price,
    };

    user.purchaseHistory.push(purchase);

    // Save the user's updated purchase history
    await user.save();

    // 7. Send the payment intent's client secret to the frontend
    res.status(200).json({
      message: 'Purchase successful!',
      purchase,
      clientSecret: paymentIntent.client_secret, // This is sent for handling the payment on the frontend
      user,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during the purchase.' });
  }
};

module.exports = {
  purchaseMarket,
};
