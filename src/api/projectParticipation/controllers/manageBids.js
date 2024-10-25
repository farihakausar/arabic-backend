
const { ProjectModel} = require('../../../models/ProjectModel');
const { BidModel} = require('../../../models/BidModel');
const manageBids =  async (req, res) => {
    try {
        const { projectId, bidId, action } = req.params;
        const bid = await BidModel.findById(bidId);

        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        if (action === 'approve') {
            bid.status = 'approved';
        } else if (action === 'reject') {
            bid.status = 'rejected';
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }

        await bid.save();
        res.json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    manageBids,
  }
  
  