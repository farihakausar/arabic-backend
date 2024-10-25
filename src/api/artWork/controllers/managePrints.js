const {artworkSchema}  = require('../../../models/ArtistProfile');;
const fs = require('fs');
const path = require('path');

const managePrints = async (req, res) => {
    try {
        const { artworkId } = req.params;
        const { formats, sizes, pricing, availability } = req.body;
        const updatedArtwork = await artworkSchema.findByIdAndUpdate(artworkId, { prints: { formats, sizes, pricing, availability } }, { new: true });
        res.json(updatedArtwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    managePrints,
  }
  
  