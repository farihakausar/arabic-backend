const { ProjectModel } = require("../../../models/ProjectModel");

const viewProjects = async (req, res) => {
  try {
    const { userId } = req.params; // Extract the userId from the request parameters

    // Fetch all projects created by the given userId
    const projects = await ProjectModel.find({ createdBy: userId });

    // If no projects are found, return a 404
    if (!projects.length) {
      return res
        .status(404)
        .json({ message: "No projects found for this user." });
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
