const { ProjectModel } = require("../../../models/ProjectModel");

const viewProjects = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the userId from the request parameters

    // Extract filters from query params
    const {
      status,
      projectType,
      location,
      eligibility,
      prizeRange,
      deadline,
      hostOrganisation,
    } = req.query;

    // Build the filter object dynamically
    let filter = { createdBy: userId };

    if (status) filter.status = status;
    if (projectType) filter.projectType = projectType;
    if (location) filter.location = location;
    if (eligibility) filter.eligibility = eligibility;
    if (prizeRange) filter.prizeRange = prizeRange;
    if (deadline) filter.deadline = deadline;
    if (hostOrganisation) filter.hostOrganisation = hostOrganisation;

    // Fetch projects based on the filter
    const projects = await ProjectModel.find(filter);

    // If no projects are found, return a 404
    if (!projects.length) {
      return res.status(404).json({ message: "No projects found with the given criteria." });
    }

    // Send the found projects in the response
    res.status(200).json(projects);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  viewProjects,
};
