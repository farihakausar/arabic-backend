const { User } = require('../../../models/UserProfile'); // Adjust the path as necessary
const { ArtistProfile } = require('../../../models/ArtistProfile');

const followArtist = async (req, res) => {
    const { userId, artistId } = req.body;

    if (!userId || !artistId) {
        return res.status(400).json({ message: 'User ID and Artist ID are required.' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the artist is already followed
        if (user.following.includes(artistId)) {
            return res.status(409).json({ message: 'You are already following this artist.' });
        }

        // Add artistId to user's following array
        user.following.push(artistId);
        await user.save();

        // Find the artist profile by ID
        const artistProfile = await ArtistProfile.findById(artistId);
        if (!artistProfile) {
            return res.status(404).json({ message: 'Artist not found.' });
        }

        // Increment the artist's followersCount
        artistProfile.followersCount += 1; // Increase follower count
        artistProfile.followers.push(userId); // Add user to artist's followers
        await artistProfile.save();

        return res.status(200).json({ 
            message: 'You are now following this artist.', 
            artistProfile 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'An error occurred while trying to follow the artist.' });
    }
};

module.exports = {
    followArtist,
};
