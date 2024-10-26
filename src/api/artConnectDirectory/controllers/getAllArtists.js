const { ArtistProfile } = require('../../../models/ArtistProfile');

const getAllArtists = async (req, res) => {
  try {
    // Fetch only non-deleted artists with complete profiles
    const artists = await ArtistProfile.find({ isProfileComplete: true });

    // Return the list of artists
    res.status(200).json(artists);
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllArtists,
};
