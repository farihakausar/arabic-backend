
const { ProjectModel} = require('../../../models/ProjectModel');
const { BidModel} = require('../../../models/BidModel');
const viewProjects = async (req, res) => {
    try {
        const project = new ProjectModel({ ...req.body, createdBy: req.userId });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    viewProjects,
  }
  
  