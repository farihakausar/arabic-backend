const { ProjectModel } = require("../../../models/ProjectModel");
const { BidModel } = require("../../../models/BidModel");
const { OpenCalls } = require("../../../models/OpenCalls");
const { ArtistProfile } = require("../../../models/ArtistProfile");
// Function to submit a bid to a project
const submitBid = async (req, res) => {
  try {
    const { userId } = req.params;
    // Check if the hostedBy user exists and has the "patron" role
    const user = await ArtistProfile.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { projectId, artworkProposal, timeline, pricing, openCallId } =
      req.body;

    // Create a new bid
    const bid = new BidModel({
      artworkProposal,
      timeline,
      pricing,
      bidder: userId, // Assuming the artist's user ID is stored in req.userId after authentication
      projectId: projectId, // Associate the bid with the correct project ID
    });

    // Save the bid to the database
    await bid.save();

    // Check if the project is part of an open call and update the open call's bids
    if (openCallId) {
      await OpenCalls.findByIdAndUpdate(openCallId, {
        $push: { bids: bid._id },
      });
    }

    // Find the project by its ID and push the bid to the project's bids array
    await ProjectModel.findByIdAndUpdate(projectId, {
      $push: { bids: bid._id },
    });

    // Return the saved bid in the response
    res.status(201).json(bid);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitBid,
};
