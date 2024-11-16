const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    salePrice: { type: Number, required: true },
    saleDate: { type: Date, default: Date.now },
    
    paymentInfo: { type: String, required: true }, // Details about the payment


    patronId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patron' },
    transactionId: { type: String, required: true },
 
    description: { type: String },
    status: { type: String, enum: ['Completed', 'Pending', 'Failed'], default: 'Pending' }
}, { timestamps: true });


const TransactionModel = mongoose.model('Transaction', transactionSchema);
module.exports ={ TransactionModel}

