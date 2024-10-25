const {artworkSchema}  = require('../../../models/ArtistProfile');
const fs = require('fs');
const path = require('path');

const manageDisplayOptions  = async (req, res) => {
    try {
        const { artworkId } = req.params;
        const { displayOptions } = req.body;
        const updatedArtwork = await artworkSchema.findByIdAndUpdate(artworkId, { displayOptions }, { new: true });
        res.json(updatedArtwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  module.exports = {
    manageDisplayOptions

  }
  
  