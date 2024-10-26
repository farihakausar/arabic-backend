const bcrypt = require('bcryptjs');

const {User} = require('../../../models/UserProfile');
const {ArtistProfile} = require('../../../models/ArtistProfile'); // Import the Artist model

const signup = async (req, res) => {
    try {
        const { fullName, username, email, mobileNumber, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            fullName,
            username,
            email,
            mobileNumber,
            password: hashedPassword,
            role
        };

        if (role === 'artist') {
      
            const artist = new ArtistProfile(userData);
            await artist.save();
            res.status(201).json({ message: 'Artist created successfully', artistId: artist._id });
        } else {
            // Save to User schema
            const user = new User(userData);
            await user.save();
            res.status(201).json({ message: 'User created successfully', userId: user._id });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signup,
};
