const { User } = require("../../../models/UserProfile");

const { ArtMarket } = require("../../../models/ArtMarket");

const purchaseMarket = async (req, res) => {
  const { userId, artworkId, price } = req.body;

  try {
    // 1. Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // 2. Find the artwork by artworkId
    const artwork = await ArtMarket.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({ message: 'ArtMarket not found.' });
    }

    const purchase = {
      artworkId: artwork._id,
      purchaseDate: new Date(),
      price: price,
    };

    user.purchaseHistory.push(purchase);

    // 5. Save the user's updated purchase history
    await user.save();

    // 6. Send response with success message
    res.status(200).json({
      message: 'Purchase successful!',
      purchase,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during the purchase.' });
  }
};

module.exports = {
  purchaseMarket,
};
