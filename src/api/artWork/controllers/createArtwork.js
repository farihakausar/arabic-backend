const { ArtistProfile } = require('../../../models/ArtistProfile');
const { Artwork } = require('../../../models/Artwork'); // Import the Artwork model
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

    // Return the created artwork in the response
    res.status(201).json({
      message: "Artwork created successfully",
      artwork: newArtwork
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createArtwork,
};
