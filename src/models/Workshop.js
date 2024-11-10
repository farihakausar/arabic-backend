const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    category: { type: String, required: true }, // Category of the workshop (e.g., Painting, Sculpture)
    date: { type: Date, required: true }, // Date of the workshop
    name: { type: String, required: true }, // Name of the workshop
    location: { type: String, required: true }, // Location of the workshop
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ArtistProfile",
      required: true,
    },

    duration: { type: String, required: true }, // Duration of the workshop (e.g., "2 hours")
    icon: { type: String }, // URL or path to an icon representing the workshop
    type: {
      type: String,
    },
    topWorkshops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workshop" }], // Array of top workshops (reference to other workshop documents)
    ratings: {
      average: { type: Number, default: 0 }, // Average rating
      count: { type: Number, default: 0 }, // Number of ratings
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Workshop = mongoose.model("Workshop", workshopSchema);

module.exports = { Workshop };
