const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const { User } = require("../../../models/UserProfile");
const { ArtistProfile } = require("../../../models/ArtistProfile");

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      user.deleted = true;
      user.deletedAt = new Date();
      await user.save();

      // await sendDeletionEmail(user.email, userId);
      return res.json({
        message:
          "User marked for deletion. A confirmation email has been sent.",
      });
    }

    const artist = await ArtistProfile.findById(userId);
    if (!artist) {
      return res.status(404).json({ message: "User or artist not found" });
    }

    artist.deleted = true;
    artist.deletedAt = new Date();
    await artist.save();

    // Send confirmation email
    // await sendDeletionEmail(artist.email, userId);
    res.json({
      message:
        "Artist marked for deletion. A confirmation email has been sent.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recoverUser = async (req, res) => {
  const { userId } = req.params;

  try {
    let user = await User.findById(userId);
    if (user && user.deleted) {
      const result = await recoverAccount(user);
      return res.status(result.status).json({ message: result.message });
    }

    let artist = await ArtistProfile.findById(userId);
    if (artist && artist.deleted) {
      const result = await recoverAccount(artist);
      return res.status(result.status).json({ message: result.message });
    }

    return res
      .status(404)
      .json({ message: "User or artist not found or not marked for deletion" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const recoverAccount = async (profile) => {
  const deletionTime = new Date(profile.deletedAt);
  const recoveryPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days
  if (new Date() - deletionTime > recoveryPeriod) {
    return { status: 410, message: "Recovery period has expired" };
  }

  profile.deleted = false;
  profile.deletedAt = null;
  await profile.save();

  return { status: 200, message: "User account recovered successfully" };
};

const sendDeletionEmail = async (email, userId) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "dummyemail@gmail.com", // Replace with dummy email
      pass: "dummyPassword", // Replace with dummy password
    },
  });

  const mailOptions = {
    from: "dummyemail@gmail.com", // Replace with dummy email
    to: email,
    subject: "Account Deletion Confirmation",
    text:
      "Your account has been marked for deletion. If this was a mistake, you can recover your account within the next 30 days by clicking the link below:\n\n" +
      `http://website/recover/${userId}`, // Ensure to include "http://" or "https://"
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  deleteUser,
  recoverUser,
};
