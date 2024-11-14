const { User } = require("../../../models/UserProfile");

const { ArtMarket } = require('../../../models/ArtMarket'); // Assuming you have a Market model

// Controller to add or remove a market from the user's favorite markets list
const favMarket = async (req, res) => {
  const {userId} = req.params; // Get user ID from JWT (assuming it's in the request)
  const { marketId } = req.body; // The market ID to add/remove

  // Validate that marketId is provided
  if (!marketId) {
    return res.status(400).json({ message: 'Market ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the market is already in the user's favMarkets list
    const isAlreadyFav = user.favArtMarket.includes(marketId);

    if (isAlreadyFav) {
      // If the market is already a favorite, remove it
      user.favArtMarket = user.favArtMarket.filter(id => id.toString() !== marketId.toString());
      await user.save();

      return res.status(200).json({
        message: 'Market removed from favorites',
        favMarkets: user.favMarkets
      });
    } else {
      // If the market is not a favorite, add it
      user.favArtMarket.push(marketId);
      await user.save();

      return res.status(200).json({
        message: 'Market added to favorites',
        favMarkets: user.favArtMarket
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating favorite markets' });
  }
};

module.exports = {
  favMarket,
};
