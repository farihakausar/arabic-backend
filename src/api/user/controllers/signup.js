const bcrypt = require("bcryptjs");
const { PatronProfile } = require("../../../models/PatronProfile");
const { User } = require("../../../models/UserProfile");
const { ArtistProfile } = require("../../../models/ArtistProfile");
const {Wallet}= require("../../../models/Wallet"); // Import Wallet model

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
      role,
    };

    let user;
    if (role === "artist") {
      const artist = new ArtistProfile(userData);
      await artist.save();
      user = artist; // set user to the created artist
      res.status(201).json({ message: "Artist created successfully", artistId: artist._id });
    } else if (role === "patron" || role==="Intermediary") {
      const patronProfile = new PatronProfile(userData);
      await patronProfile.save();
      user = patronProfile; // set user to the created patron
      res.status(201).json({ message: "Patron created successfully", userId: patronProfile._id });
    } else {
      const newUser = new User(userData);
      await newUser.save();
      user = newUser; // set user to the created user
      res.status(201).json({ message: "User created successfully", userId: newUser._id });
    }

    // Create a wallet for the user after creation
    const newWallet = new Wallet({
      userId: user._id,
      balance: 0,
      currency: 'SAR',
      transactions: [], // empty transaction history
    });

    await newWallet.save();
    console.log(`Wallet created for user: ${user._id}`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signup,
};
