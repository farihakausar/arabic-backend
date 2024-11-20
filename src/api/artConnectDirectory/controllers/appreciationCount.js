const mongoose = require("mongoose");
const { ArtMarketSchemaModel } = require("../../../models/ArtMarket");
const { ArtistProfile } = require("../../../models/ArtistProfile");

const appreciationCount = async (req, res) => {
  try {
    const { artistId } = req.params; // Assume artistId is passed in the URL parameters

    // Validate that the artistId exists
    if (!mongoose.Types.ObjectId.isValid(artistId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid artist ID.",
      });
    }

    // Correctly convert artistId to ObjectId using the new keyword
    const artistObjectId = new mongoose.Types.ObjectId(artistId);

    // Find all artworks from the given artist
    const artistArtworks = await ArtMarketSchemaModel.find({ artist: artistObjectId });

    // Check if the artist has any artworks in the marketplace
    if (!artistArtworks || artistArtworks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No artworks found for this artist.",
      });
    }

    // Initialize variables for calculating statistics
    let totalLikes = 0;
    let totalViews = 0;
    let totalSales = 0;
    let totalRevenue = 0;

    // Loop through each artwork to sum up the statistics
    artistArtworks.forEach(artwork => {
      totalLikes += artwork.likes;
      totalViews += artwork.views;
      totalSales += artwork.sales;
      totalRevenue += artwork.revenue;
    });

    // Prepare the response with the calculated statistics
    res.status(200).json({
      success: true,
      data: {
        artistId,
        totalLikes,
        totalViews,
        totalSales,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = {
  appreciationCount,
};
