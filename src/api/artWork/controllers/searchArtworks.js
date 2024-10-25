const {artworkSchema}  = require('../../../models/ArtistProfile');
const fs = require('fs');
const path = require('path');

const searchArtworks = async (req, res) => {
    try {
        const { query } = req.query; // e.g., categories, location, themes, etc.
        const artworks = await artworkSchema.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
                // Additional filters can be added here
            ]
        });
        res.json(artworks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  module.exports = {
    searchArtworks,
  }
  
  