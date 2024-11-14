const { Artwork } = require('../../../models/Artwork'); // Correct model for artwork
const fs = require('fs');
const path = require('path');

const deleteArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params; // Get artwork ID from request params
    
    // Validate the artworkId
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    // If the artwork has an image, delete the image file from the server
    if (artwork.image) {
      const imagePath = path.join(__dirname, '../../../public/images', artwork.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error deleting image:', err);
        }
      });
    }

    // Delete the artwork from the database
    await Artwork.findByIdAndDelete(artworkId);

    // Return success message
    res.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  deleteArtwork,
};
