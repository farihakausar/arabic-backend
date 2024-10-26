const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../../models/UserProfile');
const { ArtistProfile } = require('../../../models/ArtistProfile'); 
const { CollectionGroup } = require('firebase-admin/firestore');


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Try to find the user in User model
    let user = await User.findOne({ email });

    // If not found, try to find the user in Artist model
    if (!user) {
   
      user = await ArtistProfile.findOne({ email });
    }

    // If still not found, return 401
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your_jwt_secret', { expiresIn: '1h' });

    // Respond with token and user information
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  login,
};
