const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const createUser = async (req, res) => {
    try {
        const { fullName, username, email, mobileNumber, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            fullName,
            username,
            email,
            mobileNumber,
            password: hashedPassword,
            role
        });
        
        await user.save();
        res.status(201).json({ message: 'User created successfully', userId: user._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    createUser,
  }
  
  