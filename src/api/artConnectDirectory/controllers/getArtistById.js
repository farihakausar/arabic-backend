const { ArtistProfile } = require("../../../models/ArtistProfile");

const getArtistById = async (req, res) => {
  const { artistId } = req.params; // Get the artist ID from the request parameters

  try {
    // Fetch the artist profile by ID
    const artist = await ArtistProfile.findById(artistId);

    // Check if the artist was found
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    // Increment the profile views count by 1
    artist.profileViews += 1;

    // Save the updated artist profile
    await artist.save();

    // Return the updated artist profile
    res.status(200).json(artist);
  } catch (error) {
    // Handle any errors that occur during the database operation
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getArtistById,
};
