const { ArtMarketSchemaModel } = require("../../../models/ArtMarket");


const getAllMarket = async (req, res) => {
  try {
    const markets = await ArtMarketSchemaModel.find()
      .populate("artwork") // populate the artwork details
      .populate("artist")  // populate the artist details
      .exec();

    res.status(200).json({
      success: true,
      data: markets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch market items.",
    });
  }
};

module.exports = { getAllMarket };
