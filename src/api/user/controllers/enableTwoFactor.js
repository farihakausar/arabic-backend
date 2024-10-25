const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');


const enableTwoFactor =  async (req, res) => {
    const { userId } = req.params;
    const secret = speakeasy.generateSecret();
    
    await User.findByIdAndUpdate(userId, {
        isTwoFactorEnabled: true,
        twoFactorSecret: secret.base32
    });

    res.json({ secret: secret.base32 });
};

  
  module.exports = {
    enableTwoFactor,
  }
  
  