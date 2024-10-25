const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    timeline: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['submitted', 'approved', 'rejected'], default: 'submitted' },
}, { timestamps: true });


const BidModel =  mongoose.model('Bid', bidSchema);
module.exports ={ BidModel}


