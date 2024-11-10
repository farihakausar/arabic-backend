const { BidModel } = require("../../../models/BidModel"); // Adjust the path to where your BidModel is located

const getBidById = async (req, res) => {
  try {
    const { bidId } = req.params; // Get the bidId from the request parameters

    const bid = await BidModel.findById(bidId); // Find the bid by ID

    if (!bid) {
      return res.status(404).json({ error: "Bid not found" }); // If no bid found, return 404
    }

    res.status(200).json(bid); // If bid is found, return it in the response
  } catch (error) {
    console.error("Error fetching bid:", error); // Log the error
    res.status(500).json({ error: "Failed to fetch bid" }); // Return a 500 error if something goes wrong
  }
};

module.exports = {
  getBidById,
};
