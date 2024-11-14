const { Artwork } = require('../../../models/Artwork'); // Ensure you're importing the model, not the schema.

const manageDisplayOptions = async (req, res) => {
  try {
    const { artworkId } = req.params;
    const { displayOptions } = req.body;

    // Update the artwork's displayOptions
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { displayOption: displayOptions },  // Ensure you're updating the correct field (displayOption).
      { new: true } // This option will return the updated document.
    );

    if (!updatedArtwork) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    // Return the updated artwork
    res.json(updatedArtwork);
  } catch (error) {
    console.error('Error updating artwork:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  manageDisplayOptions
};
