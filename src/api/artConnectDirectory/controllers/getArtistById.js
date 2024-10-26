const { ArtistProfile } = require('../../../models/ArtistProfile');

const getArtistById = async (req, res) => {
  const { artistId } = req.params; // Get the artist ID from the request parameters

  try {
    // Fetch the artist profile by ID
    const artist = await ArtistProfile.findById(artistId);

    // Check if the artist was found
    if (!artist || artist.deleted) {
      return res.status(404).json({ message: 'Artist not found' });
    }

    // Return the artist profile
    res.status(200).json(artist);
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getArtistById,
};
