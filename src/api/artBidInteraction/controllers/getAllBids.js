const { OpenCalls } = require("../../../models/OpenCalls");

const getAllBids = async (req, res) => {
  const { openCallId } = req.params;

  try {
    // Find the open call by its ID and populate the associated bids
    const openCall = await OpenCalls.findById(openCallId).populate("bids");

    if (!openCall) {
      return res.status(404).json({ error: "Open call not found" });
    }

    // Return the list of bids associated with the open call
    res.status(200).json(openCall.bids);
  } catch (error) {
    console.error("Error fetching bids:", error);
    res.status(500).json({ error: "Failed to fetch bids" });
  }
};

module.exports = {
  getAllBids,
};
