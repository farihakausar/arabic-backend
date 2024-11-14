const { ArtMarketSchemaModel } = require("../models/ArtMarket");

const getMarketById = async (req, res) => {
  const { id } = req.params;

  try {
    const market = await ArtMarketSchemaModel.findById(id)
      .populate("artwork") // populate the artwork details
      .populate("artist")  // populate the artist details
      .exec();

    if (!market) {
      return res.status(404).json({
        success: false,
        message: "Market item not found.",
      });
    }

    // Increment view count
    market.views += 1;
    await market.save();

    res.status(200).json({
      success: true,
      data: market,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch market item.",
    });
  }
};

module.exports = { getMarketById };
