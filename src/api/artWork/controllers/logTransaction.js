const {artworkSchema}  = require('../../../models/ArtistProfile');
const {TransactionModel} = require('../../../models/TransactionModel');
const fs = require('fs');
const path = require('path');

const logTransaction = async (req, res) => {
    try {
        const { artworkId, buyerId, salePrice, paymentInfo } = req.body;
        const transaction = new TransactionModel({ artworkId, buyerId, salePrice, paymentInfo });
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  
  module.exports = {
    logTransaction,
  }
  
  