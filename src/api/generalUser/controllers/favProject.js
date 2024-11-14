const { User } = require("../../../models/UserProfile");
const { ProjectModel } = require('../../../models/ProjectModel'); // Assuming you have a Project model

// Controller to add or remove a project from the user's favorite projects list
const favProject = async (req, res) => {
  const {userId} = req.params; // Get user ID from the authenticated user
  const { projectId } = req.body; // The project ID to add/remove

  // Validate that projectId is provided
  if (!projectId) {
    return res.status(400).json({ message: 'Project ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the project is already in the user's favProjects list
    const isAlreadyFav = user.favProjects.includes(projectId);

    if (isAlreadyFav) {
      // If the project is already a favorite, remove it
      user.favProjects = user.favProjects.filter(id => id.toString() !== projectId.toString());
      await user.save();

      return res.status(200).json({
        message: 'Project removed from favorites',
        favProjects: user.favProjects
      });
    } else {
      // If the project is not a favorite, add it
      user.favProjects.push(projectId);
      await user.save();

      return res.status(200).json({
        message: 'Project added to favorites',
        favProjects: user.favProjects
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating favorite projects' });
  }
};

module.exports = {
  favProject,
};
