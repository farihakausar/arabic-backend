const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    budgetRange: { type: String, required: true }, // e.g., "$1000 - $5000"
    timeline: { type: String, required: true }, // e.g., "3 months"
    submissionGuidelines: { type: String, required: true },
    status: { type: String, enum: ['active', 'completed', 'upcoming'], default: 'active' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }],
}, { timestamps: true });

const ProjectModel = mongoose.model('Project', projectSchema);
module.exports ={ ProjectModel}
