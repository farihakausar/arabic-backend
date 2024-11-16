const { ArtMarketSchemaModel } = require("../../../models/ArtMarket");

const getTopSales = async (req, res) => {
  try {
    // Get the top-selling items from the market, sorted by revenue in descending order
    const topSalesMarkets = await ArtMarketSchemaModel.find()
      .sort({ revenue: -1 })  // Sort by revenue in descending order
      .populate("artwork")     // Populate artwork details
      .populate("artist")      // Populate artist details
      .limit(10)               // Limit to top 10 sales
      .exec();

    res.status(200).json({
      success: true,
      data: topSalesMarkets,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top sales items.",
    });
  }
};

module.exports = { getTopSales };
