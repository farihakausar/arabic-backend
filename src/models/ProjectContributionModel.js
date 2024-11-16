const mongoose = require('mongoose');

// Assuming a project contribution schema to track patron contributions
const projectContributionSchema = new mongoose.Schema({
  patronId: { type: mongoose.Schema.Types.ObjectId, ref: 'PatronProfile', required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // Assuming we have a Project model
  contributionAmount: { type: Number, required: true },
  contributionDate: { type: Date, default: Date.now },
  description: { type: String },
  status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Pending' }, // Status of the contribution
}, { timestamps: true });

const ProjectContributionModel = mongoose.model('ProjectContribution', projectContributionSchema);

module.exports = { ProjectContributionModel };
