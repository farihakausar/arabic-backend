const mongoose = require('mongoose');
const { ProjectContributionModel } = require('../../../models/ProjectContributionModel'); // Import the contribution model
const { PatronProfile } = require('../../../models/PatronProfile'); // Import the patron profile model
const { ProjectModel } = require('../../../models/ProjectModel'); // Assuming you have a Project model

// Function to add a new contribution for a specific patron and project
const addProjectContribution = async (req, res) => {
  try {
    // Extract patronId and projectId from request body
    const { patronId, projectId, contributionAmount, description } = req.body;

    // Validate that patronId and projectId are valid ObjectIds
    if (!mongoose.Types.ObjectId.isValid(patronId)) {
      return res.status(400).json({ error: 'Invalid patron ID' });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    // Validate that contributionAmount is a positive number
    if (isNaN(contributionAmount) || contributionAmount <= 0) {
      return res.status(400).json({ error: 'Contribution amount must be a positive number' });
    }

    // Find the patron and project to verify they exist
    const patron = await PatronProfile.findById(patronId);
    if (!patron) {
      return res.status(404).json({ error: 'Patron not found' });
    }

    const project = await ProjectModel.findById(projectId); // Assuming you have a ProjectModel
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Create a new contribution document
    const newContribution = new ProjectContributionModel({
      patronId,
      projectId,
      contributionAmount,
      description,
      contributionDate: new Date(),
      status: 'Pending', // You can set the status to "Pending" or something else initially
    });

    // Save the new contribution to the database
    await newContribution.save();

    // Return a success response with the created contribution
    return res.status(201).json({
      message: 'Contribution added successfully',
      contribution: {
        contributionId: newContribution._id,
        patronId: newContribution.patronId,
        projectId: newContribution.projectId,
        contributionAmount: newContribution.contributionAmount,
        description: newContribution.description,
        contributionDate: newContribution.contributionDate,
        status: newContribution.status,
      },
    });

  } catch (error) {
    console.error('Error adding project contribution:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  addProjectContribution,
};
