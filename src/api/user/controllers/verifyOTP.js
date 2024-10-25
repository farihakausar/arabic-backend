

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');


const verifyOTP = async (req, res) => {
    const { userId } = req.params;
    const { token } = req.body;

    const user = await User.findById(userId);
    
    const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token
    });

    if (verified) {
        res.json({ message: 'OTP verified' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
};
  module.exports = {
    verifyOTP,
  }
  
  