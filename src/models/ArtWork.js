const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    medium: { type: String },
    size: { type: String },
    price: { type: Number },
    image: { type: String },
    availability: {
      type: String,
      enum: ["available", "sold", "on hold"],
      default: "available",
    },
    yearOfCreation: { type: Number },
    displayOption: {
      type: String,
      enum: [
        "Primary Market",
        "Secondary Market",
        "NFTs",
        "Prints & Souvenirs",
      ],
      required: true,
    },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "ArtistProfile" },
    certificates: [{ type: String }],
    timestampRegistration: { type: String },
    saipRegistration: { type: String },
  },
  { timestamps: true }
);
  
const Artwork = mongoose.model("artwork", artworkSchema);

module.exports = { Artwork };
