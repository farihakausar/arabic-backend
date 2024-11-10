const { OpenCalls } = require("../../../models/OpenCalls");
const { ProjectModel } = require("../../../models/ProjectModel");
const { PatronProfile } = require("../../../models/PatronProfile");

// Create open call API with patron role validation
const createOpenCalls = async (req, res) => {
  const {
    projectId,
    hostedBy,
    description,
    timeline,
    price,
    eligibiltyCreteria,
    image,
    goals,
    name,
    overview,
    bidRequirements,
    keyDates,
  } = req.body;

  try {
    // Validate required fields
    if (
      !projectId ||
      !hostedBy ||
      !description ||
      !timeline ||
      !price ||
      !goals ||
      !name
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the hostedBy user exists and has the "patron" role
    const user = await PatronProfile.findById(hostedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new open call
    const newOpenCall = new OpenCalls({
      projectId,
      hostedBy,
      description,
      timeline,
      price,
      eligibiltyCreteria,
      image,
      goals,
      name,
      overview,
      bidRequirements,
      keyDates,
    });

    // Save the new open call to the database
    await newOpenCall.save();

    // Update the project with the new open call's ID
    await ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $push: { openCalls: newOpenCall._id },
      },
      { new: true } // Returns the updated project
    );

    // Return the created open call
    return res.status(201).json(newOpenCall);
  } catch (error) {
    console.error("Error creating open call:", error);
    return res.status(500).json({ error: "Failed to create open call" });
  }
};

module.exports = {
  createOpenCalls,
};
