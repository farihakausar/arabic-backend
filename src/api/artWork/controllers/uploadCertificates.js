const {artworkSchema}  = require('../../../models/ArtistProfile');
const fs = require('fs');
const path = require('path');

const uploadCertificates = async (req, res) => {
    try {
        const { artworkId } = req.params;
        const certificatePaths = req.files.map(file => file.path); // Assuming you're using a file upload middleware
        await artworkSchema.findByIdAndUpdate(artworkId, { $push: { certificates: { $each: certificatePaths } } });
        res.json({ message: 'Certificates uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  module.exports = {
    uploadCertificates,
  }
  
  