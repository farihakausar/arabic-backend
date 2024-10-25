const {artworkSchema}  = require('../../../models/ArtistProfile');
const fs = require('fs');
const path = require('path');

const deleteArtwork =   async (req, res) => {
    try {
        const { artworkId } = req.params;
        await artworkSchema.findByIdAndDelete(artworkId);
        res.json({ message: 'Artwork deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    deleteArtwork,
  }
  
  