
const mongoose = require('mongoose');
const { ProjectContributionModel } = require('../../../models/ProjectContributionModel'); // Import the contribution model
const { PatronProfile } = require('../../../models/PatronProfile'); // Import the patron profile model

// Function to show all contributions for a specific patron
const projectContriButionsshow = async (req, res) => {
  try {
    // Extract patronId from request parameters or body
    const { patronId } = req.params;

    // Validate that patronId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(patronId)) {
      return res.status(400).json({ error: 'Invalid patron ID' });
    }

    // Query to find all contributions for the given patronId
    const contributions = await ProjectContributionModel.find({ patronId })
      .populate('projectId', 'name description startDate endDate') // Populate project details
      .populate('patronId', 'fullName emailAddress') // Populate patron details
      .sort({ contributionDate: -1 });  // Sort by contribution date, newest first

    // If no contributions found
    if (!contributions || contributions.length === 0) {
      return res.status(404).json({ message: 'No contributions found for this patron.' });
    }

    // Return the contributions data
    return res.status(200).json({
      message: 'Contributions retrieved successfully',
      contributions: contributions.map(contribution => ({
        contributionId: contribution._id,
        contributionAmount: contribution.contributionAmount,
        contributionDate: contribution.contributionDate,
        description: contribution.description,
        status: contribution.status,
        project: {
          name: contribution.projectId.name,
          description: contribution.projectId.description,
          startDate: contribution.projectId.startDate,
          endDate: contribution.projectId.endDate
        },
        patron: {
          fullName: contribution.patronId.fullName,
          emailAddress: contribution.patronId.emailAddress
        }
      }))
    });
  } catch (error) {
    console.error('Error fetching project contributions:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  projectContriButionsshow,
};
