const { ArtistProfile } = require('../../../models/ArtistProfile');

const createArtist = async (req, res) => {
    const { artistId } = req.params;
    const { biography, location, nationalIDNumber, profilePicture, servicePicture, skills, experience, exhibitions, achievements, education, digitalTools, portfolioImages } = req.body;

    try {
        // Find the artist profile by ID
        const artist = await ArtistProfile.findById(artistId);
        console.log("Finding artist...");

        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }
        console.log("Artist found:", artistId);
        
        // Update artist fields
        artist.biography = biography;
        artist.location = location;
        artist.nationalIDNumber = nationalIDNumber;
        artist.profilePicture = profilePicture;
        artist.servicePicture = servicePicture;
        artist.skills = skills || artist.skills; // Update skills if provided
        artist.experience = experience || artist.experience; // Update experience if provided
        artist.exhibitions = exhibitions || artist.exhibitions; // Update exhibitions if provided
        artist.achievements = achievements || artist.achievements; // Update achievements if provided
        artist.education = education || artist.education; // Update education if provided
        artist.digitalTools = digitalTools || artist.digitalTools; // Update digital tools if provided
        artist.portfolioImages = portfolioImages || artist.portfolioImages; // Update portfolio images if provided

        // Check if the profile is complete
        const requiredFields = ['biography', 'location', 'nationalIDNumber', 'profilePicture'];
        artist.isProfileComplete = requiredFields.every(field => artist[field]);

        console.log("Updating artist profile...");
        await artist.save();

        console.log("Artist profile updated successfully.");
        return res.status(200).json({ message: 'Artist profile updated successfully', artist });
    } catch (error) {
        console.error('Error updating artist profile:', error);
        return res.status(500).json({ error: 'Failed to update artist profile' });
    }
};

module.exports = {
    createArtist,
};
