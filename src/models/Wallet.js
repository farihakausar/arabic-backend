const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'SAR' },
  transactions: [
    {
      amount: { type: Number, required: true },
      type: { type: String, enum: ['credit', 'debit','payment','deposit','withdrawal'], required: true },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Wallet = mongoose.model('Wallet', WalletSchema);

module.exports = {Wallet};
