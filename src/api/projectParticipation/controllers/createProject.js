const { ProjectModel } = require("../../../models/ProjectModel");
const { User } = require("../../../models/UserProfile");

const createProject = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Proceed to create the project if the user exists
    const project = new ProjectModel({ ...req.body, createdBy: userId });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProject,
};
