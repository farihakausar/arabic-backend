const { Artwork } = require('../../../models/Artwork'); // Assuming Artwork model
const mongoose = require('mongoose');

const searchArtworks = async (req, res) => {
  try {
    const { query, artistId, availability, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Create the base filter object
    let filter = {};

    // Search by query in title and description
    if (query) {
      const regex = new RegExp(query, 'i'); // case-insensitive regex search
      filter.$or = [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
      ];
    }

    // Filter by artistId if provided
    if (artistId) {
      if (!mongoose.Types.ObjectId.isValid(artistId)) {
        return res.status(400).json({ message: 'Invalid artist ID.' });
      }
      filter.artistId = artistId;
    }

    // Filter by availability if provided
    if (availability) {
      filter.availability = availability;
    }

    // Filter by price range if provided
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    // Pagination logic
    const skip = (parseInt(page) - 1) * parseInt(limit); // Number of records to skip
    const limitValue = parseInt(limit); // Limit number of results per page

    // Fetch the artworks based on filters and pagination
    const artworks = await Artwork.find(filter)
      .skip(skip)
      .limit(limitValue)
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)

    // Get the total count of artworks for pagination purposes
    const totalCount = await Artwork.countDocuments(filter);

    // Calculate total number of pages
    const totalPages = Math.ceil(totalCount / limitValue);

    // Return the search results
    res.json({
      artworks, // Artworks for the current page
      totalPages, // Total number of pages
      currentPage: parseInt(page), // Current page number
      totalCount, // Total number of artworks matching the query
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchArtworks,
};
