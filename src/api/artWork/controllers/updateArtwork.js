const { Artwork } = require('../../../models/Artwork'); // Import the Artwork model
const fs = require('fs');
const path = require('path');

const updateArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params; // Extract artworkId from request params

    // Validate that artworkId is a valid ObjectId
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // If there's a new image, delete the old image (optional)
    if (req.body.image && artwork.image) {
      const oldImagePath = path.join(__dirname, '../../../public/images', artwork.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.error('Error deleting old image:', err);
        }
      });
    }

    // Update the artwork's fields with the data from the request body
    artwork.title = req.body.title || artwork.title;
    artwork.description = req.body.description || artwork.description;
    artwork.medium = req.body.medium || artwork.medium;
    artwork.size = req.body.size || artwork.size;
    artwork.price = req.body.price || artwork.price;
    artwork.image = req.body.image || artwork.image;  // If new image provided, update it
    artwork.availability = req.body.availability || artwork.availability;
    artwork.yearOfCreation = req.body.yearOfCreation || artwork.yearOfCreation;
    artwork.displayOption = req.body.displayOption || artwork.displayOption;
    artwork.certificates = req.body.certificates || artwork.certificates;
    artwork.timestampRegistration = req.body.timestampRegistration || artwork.timestampRegistration;
    artwork.saipRegistration = req.body.saipRegistration || artwork.saipRegistration;

    // Save the updated artwork to the database
    await artwork.save();

    // Respond with the updated artwork
    res.status(200).json({
      message: 'Artwork updated successfully',
      artwork: artwork
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateArtwork,
};
