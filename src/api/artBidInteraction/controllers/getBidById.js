const { BidModel } = require('../../../models/BidModel'); 


const getBidById = async (req, res) => {
    const { bidId } = req.params; 

    try {
        const bid = await BidModel.findById(bidId); 

        if (!bid) {
            return res.status(404).json({ error: 'Bid not found' });
        }

        res.status(200).json(bid);
    } catch (error) {
        console.error('Error fetching bid:', error);
        res.status(500).json({ error: 'Failed to fetch bid' });
    }
};

module.exports = {
    getBidById,
};
