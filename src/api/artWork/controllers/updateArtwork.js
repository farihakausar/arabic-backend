const {artworkSchema}  = require('../../../models/ArtistProfile');
const fs = require('fs');
const path = require('path');

const updateArtwork = async (req, res) => {
    try {
        const artwork = new artworkSchema({ ...req.body, artistId: req.userId });
        await artwork.save();
        res.status(201).json(artwork);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    updateArtwork,
  }
  
  