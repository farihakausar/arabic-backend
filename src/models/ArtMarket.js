const mongoose = require("mongoose");

const ArtMarketSchema = new mongoose.Schema({
  image: {
    type: String, // URL or path to the image
    required: true,
  },
  likes: {
    type: Number,
    default: 0, // default to 0 likes
  },
  views: {
    type: Number,
    default: 0, // default to 0 views
  },
  sales: {
    type: Number,
    default: 0, // Number of sales
  },
  revenue: {
    type: Number,
    default: 0, // Total revenue generated from sales
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ArtistProfile", // reference to an artist document
    required: true,
  },
  artwork: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artwork", // reference to an artwork document
    required: true,
  },
});

const ArtMarketSchemaModel = mongoose.model("ArtMarket", ArtMarketSchema);

module.exports = { ArtMarketSchemaModel };
