const { ArtMarketSchemaModel } = require("../models/ArtMarket");

const getMostViewed = async (req, res) => {
  try {
    // Get the most viewed items from the market, sorted by views in descending order
    const mostViewedMarkets = await ArtMarketSchemaModel.find()
      .sort({ views: -1 }) // Sort by views in descending order
      .populate("artwork")  // Populate artwork details
      .populate("artist")   // Populate artist details
      .limit(10)  // Limit the number of results to top 10 most viewed
      .exec();

    res.status(200).json({
      success: true,
      data: mostViewedMarkets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch most viewed items.",
    });
  }
};

module.exports = { getMostViewed };
