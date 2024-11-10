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
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist", // reference to an artist document
    required: true,
  },
});
const ArtMarketSchemaModel = mongoose.model("ArtMarket", ArtMarketSchema);
module.exports = { ArtMarketSchemaModel };
