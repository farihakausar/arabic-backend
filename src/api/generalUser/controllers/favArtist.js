const { User } = require("../../../models/UserProfile");
const { ArtistProfile } = require('../../../models/ArtistProfile'); // Assuming you have an ArtistProfile model

// Controller function to handle adding/removing favorite artists
const favArtist = async (req, res) => {
  const {userId }= req.params // Assuming user ID is available in the request (e.g., via JWT authentication)
  const { artistId } = req.body; // The ID of the artist to add/remove

  // Validate that the artistId is provided
  if (!artistId) {
    return res.status(400).json({ message: 'Artist ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the artist is already in the user's following list
    const isAlreadyFollowing = user.following.includes(artistId);

    if (isAlreadyFollowing) {
      // If the user is already following the artist, remove them from the following array
      user.following = user.following.filter(id => id.toString() !== artistId.toString());
      await user.save();

      return res.status(200).json({
        message: 'Artist removed from favorites',
        following: user.following,
      });
    } else {
      // If the user is not following the artist, add the artist to the following array
      user.following.push(artistId);
      await user.save();

      return res.status(200).json({
        message: 'Artist added to favorites',
        following: user.following,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating favorite artists' });
  }
};

module.exports = {
  favArtist,
};
