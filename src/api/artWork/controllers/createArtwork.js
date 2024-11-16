const { ArtistProfile } = require('../../../models/ArtistProfile');
const { Artwork } = require('../../../models/Artwork'); // Import the Artwork model
const { ArtMarketSchemaModel } = require('../../../models/ArtMarket'); // Import the ArtMarket model
const { Notification } = require('../../../models/Notification'); // Import the Notification model
const { NotificationSettings } = require('../../../models/NotificationSettings'); // Import the NotificationSettings model
const mongoose = require("mongoose");

const createArtwork = async (req, res) => {
  try {
    const { artistId } = req.params;  // Extract the artistId from the request parameters
    
    // Validate that the artistId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({ message: "Invalid artist ID." });
    }

    // Check if the artist exists
    const artistProfile = await ArtistProfile.findById(artistId);
    if (!artistProfile) {
      return res.status(404).json({ message: "Artist profile not found." });
    }

    // Create a new artwork object using the request body and link to the artistId
    const newArtwork = new Artwork({
      ...req.body,  // Use the request body to populate the artwork fields
      artistId: artistId,  // Set the artistId in the artwork to the artist's profile
    });

    // Save the artwork to the database
    await newArtwork.save();

    // Ensure the gallery field exists and is an array
    if (!artistProfile.gallery) {
      artistProfile.gallery = []; // Initialize as an empty array if not already
    }

    // Add the new artwork to the artist's gallery
    artistProfile.gallery.push(newArtwork._id);
    
    // Save the updated artist profile
    await artistProfile.save();

    // Create a new ArtMarket entry for this artwork
    const newArtMarketEntry = new ArtMarketSchemaModel({
      image: req.body.image, // Use the image URL from the request body
      artist: artistId,  // Link the artist to the art market
      artwork: newArtwork._id,  // Link the artwork to the art market
    });

    // Save the ArtMarket entry
    await newArtMarketEntry.save();

    // **Notification Logic**
    // Fetch users who have subscribed to artwork notifications
    const usersToNotify = await NotificationSettings.find({
      notify_new_artwork: true,
    }).populate("user");

    // Send notification to each user
    usersToNotify.forEach(async (setting) => {
      const user = setting.user;

      // Create a notification for each user
      const notification = new Notification({
        user: user._id,
        event_type: "new_artwork",
        message: `A new artwork titled "${newArtwork.title}" has been added by artist "${artistProfile.name}".`,
      });

      await notification.save();

      // Optionally, send a push notification/email, etc.
      sendPushNotification(user, notification.message); // Implement your push notification service
      sendEmailNotification(user.email, notification.message); // Implement your email service
    });

    // Return the created artwork and the ArtMarket entry in the response
    res.status(201).json({
      message: "Artwork and ArtMarket entry created successfully",
      artwork: newArtwork,
      artMarket: newArtMarketEntry,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArtwork,
};
