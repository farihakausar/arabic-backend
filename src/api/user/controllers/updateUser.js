const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const {User} = require('../../../models/UserProfile');
const {ArtistProfile} = require('../../../models/ArtistProfile'); 

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    updateUser,
  }
  
  