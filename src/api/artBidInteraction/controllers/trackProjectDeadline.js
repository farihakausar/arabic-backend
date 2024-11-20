const mongoose = require("mongoose");
const { OpenCalls } = require("../../../models/OpenCalls");

const trackProjectDeadline = async (req, res) => {
  try {
    const { projectId } = req.query;

    
    if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: "Invalid or missing projectId" });
    }

    // Create an ObjectId from the projectId
    const objectId = new mongoose.Types.ObjectId(projectId);

    // Query the OpenCalls model for bids related to the projectId
    const bids = await OpenCalls.find({
      projectId: objectId,  // Match the projectId
    })
    .sort({ "timeline.startDate": 1 })  // Sort by startDate in ascending order
    .exec();

    // Check if there are any bids returned
    if (!bids || bids.length === 0) {
      return res.status(404).json({ message: "No bids found for the specified project" });
    }

    // Return the bids data with sorted dates
    return res.status(200).json({ bids });
  } catch (error) {
    console.error("Error tracking project deadlines:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  trackProjectDeadline,
};
