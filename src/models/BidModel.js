const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for bids
const bidSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  bidder: {
    type: Schema.Types.ObjectId,
    ref: "User", // Reference to the User model (bidder submitting the proposal)
    required: true,
  },
  artworkProposal: {
    type: String, // The artwork proposal text or description
    required: true,
  },
  timeline: {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  pricing: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USD", // Default currency is USD, you can modify it based on your needs
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Bid model
const BidModel = mongoose.model("Bid", bidSchema);

module.exports = { BidModel };
