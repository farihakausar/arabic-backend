
const { ProjectModel} = require('../../../models/ProjectModel');
const { BidModel} = require('../../../models/BidModel');

const submitBid =  async (req, res) => {
    try {
        const bid = new BidModel({ ...req.body, artistId: req.userId });
        await bid.save();
        await Project.findByIdAndUpdate(req.body.projectId, { $push: { bids: bid._id } });
        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    submitBid,
  }
  
  