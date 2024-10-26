const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    hostedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    timeline: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['submitted', 'approved', 'rejected'], default: 'submitted' },
    eligibiltyCreteria: { type: String}, // Array of strings for creatives
    image: { type: String },
    image: { type: String }, // URL or path to the image
    goals: { type: Date, required: true }, // Deadline for the bid
    name: { type: String, required: true }, // Name of the bid
    overview: { type: String }, // Overview of the bid
    bidRequirements: { type: String }, // Requirements for the bid
    keyDates: { type: [Date] }, // Array of key dates for the project
}, { timestamps: true });

const BidModel = mongoose.model('Bid', bidSchema);
module.exports = { BidModel };
