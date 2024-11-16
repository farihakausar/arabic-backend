const { Wallet } = require("../../../models/Wallet");

const transferFunds = async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;

    if (amount <= 0) {
      return res.status(400).send({ message: 'Amount must be greater than zero.' });
    }

    const fromWallet = await Wallet.findOne({ userId: fromUserId });
    const toWallet = await Wallet.findOne({ userId: toUserId });

    if (!fromWallet || !toWallet) {
      return res.status(404).send({ message: 'Wallet not found for one or both users.' });
    }

    if (fromWallet.balance < amount) {
      return res.status(400).send({ message: 'Insufficient balance in sender wallet.' });
    }

    // Deduct funds from sender wallet
    fromWallet.balance -= amount;
    await fromWallet.save();

    // Add funds to recipient wallet
    toWallet.balance += amount;
    await toWallet.save();

    // Log transactions for both wallets
    const senderTransaction = {
      type: 'payment', // Use a valid type here
      amount: amount,
      toUserId: toUserId,
      date: new Date()
    };

    const recipientTransaction = {
      type: 'payment', // Use a valid type here
      amount: amount,
      fromUserId: fromUserId,
      date: new Date()
    };

    fromWallet.transactions.push(senderTransaction);
    toWallet.transactions.push(recipientTransaction);
    await fromWallet.save();
    await toWallet.save();

    return res.status(200).send({
      message: 'Transfer successful.',
      fromWalletBalance: fromWallet.balance,
      toWalletBalance: toWallet.balance
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  transferFunds,
};
