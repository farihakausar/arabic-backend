const { BidModel } = require("../../../models/BidModel");
const { Notification } = require('../../../models/Notification');  // Assuming you have a Notification model
const { NotificationSettings } = require('../../../models/NotificationSettings');  // Assuming you have a NotificationSettings model

const projectBidsStatus = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { action } = req.body;

    // Find the bid by ID
    const bid = await BidModel.findById(bidId).populate("userId"); // Assuming the bidder is stored as userId in the bid

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // Determine the bid status based on the action
    let statusMessage = "";
    if (action === "approve") {
      bid.status = "accepted";
      statusMessage = `Your bid for the project "${bid.projectName}" has been accepted.`;
    } else if (action === "reject") {
      bid.status = "rejected";
      statusMessage = `Your bid for the project "${bid.projectName}" has been rejected.`;
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    // Save the updated bid status
    await bid.save();

    // **Notification Logic**
    const bidder = bid.userId;  // User who placed the bid

    // Create a notification for the bidder
    const notification = new Notification({
      user: bidder._id,
      event_type: "bid_status_update",
      message: statusMessage,
    });

    await notification.save();
// Implement this method based on your email service (e.g., SendGrid)

    res.json({
      message: "Bid status updated successfully",
      bid,
      notification: notification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  projectBidsStatus,
};
