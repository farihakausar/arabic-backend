const { BidModel } = require('../../../models/BidModel'); // Adjust the path as needed

const getAllBids = async (req, res) => {
    try {
        const bids = await BidModel.find(); // Fetch all bids
        res.status(200).json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ error: 'Failed to fetch bids' });
    }
};

module.exports = {
    getAllBids,
};
