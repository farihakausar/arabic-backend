const { Artwork } = require('../../../models/Artwork');

const uploadCertificates = async (req, res) => {
  try {
    const { artworkId } = req.params;

    // Check if artworkId is provided
    if (!artworkId) {
      return res.status(400).json({ message: 'Artwork ID is required.' });
    }

    // Extract the certificate paths from the request body
    const { certificatePaths } = req.body;

    // Check if certificatePaths are provided and is an array
    if (!certificatePaths || !Array.isArray(certificatePaths) || certificatePaths.length === 0) {
      return res.status(400).json({ message: 'Valid certificate paths are required.' });
    }

    // Update the artwork with new certificate paths
    const artwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { $push: { certificates: { $each: certificatePaths } } },
      { new: true } // Return the updated artwork
    );

    // Handle case where artwork is not found
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found.' });
    }

    // Return success response
    res.status(200).json({ message: 'Certificates uploaded successfully', artwork });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { uploadCertificates };
