const mongoose = require("mongoose");

const openCallsSchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    description: { type: String },
    timeline: { type: String },
    price: { type: Number },
    status: {
      type: String,
      enum: ["submitted", "approved", "rejected"],
      default: "submitted",
    },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    eligibiltyCreteria: { type: String }, // Array of strings for creatives
    image: { type: String },
    image: { type: String }, // URL or path to the image
    goals: { type: Date }, // Deadline for the bid
    name: { type: String }, // Name of the bid
    overview: { type: String }, // Overview of the bid
    bidRequirements: { type: String }, // Requirements for the bid
    keyDates: { type: [Date] }, // Array of key dates for the project
  },
  { timestamps: true }
);

const OpenCalls = mongoose.model("openCall", openCallsSchema);
module.exports = { OpenCalls };
