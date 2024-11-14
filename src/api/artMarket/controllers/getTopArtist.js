const { ArtMarketSchemaModel } = require("../models/ArtMarket");
const { Artist } = require("../models/Artist"); // Assuming there's an Artist model.

const getTopArtist = async (req, res) => {
  try {
    // Aggregate to find top artists by the number of market items
    const topArtists = await ArtMarketSchemaModel.aggregate([
      { $group: { _id: "$artist", totalItems: { $sum: 1 } } }, // Group by artist and count their items
      { $sort: { totalItems: -1 } }, // Sort by totalItems in descending order
      { $limit: 10 }, // Limit to top 10 artists
      { $lookup: { // Lookup artist details from the "Artist" collection
          from: "artists",
          localField: "_id",
          foreignField: "_id",
          as: "artistDetails",
        }
      },
      { $unwind: "$artistDetails" }, // Unwind the array to get single artist object
      { $project: { "artistDetails": 1, "totalItems": 1 } }, // Project the artist details and total items
    ]);

    res.status(200).json({
      success: true,
      data: topArtists,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch top artists.",
    });
  }
};

module.exports = { getTopArtist };
