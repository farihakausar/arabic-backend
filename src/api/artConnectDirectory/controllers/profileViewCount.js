const { ArtistProfile } = require("../../../models/ArtistProfile");

const profileViewCount = async (req, res) => {
  const { artistId } = req.params; // Get the artist ID from the request parameters

  try {
    // Fetch the artist profile by ID
    const artist = await ArtistProfile.findById(artistId);

    // Check if the artist was found
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Return the profile views count
    res.status(200).json({ profileViews: artist.profileViews });
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  profileViewCount,
};
