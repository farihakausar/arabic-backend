
const {Wallet}=require("../../../models/Wallet")
const depositFunds = async (req, res) => {
    try {
      const { userId } = req.params;
      const { amount, paymentMethod } = req.body;
  
      if (amount <= 0) {
        return res.status(400).send({ message: 'Amount must be greater than zero.' });
      }
  
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).send({ message: 'Wallet not found.' });
      }
  
      // Add funds to wallet
      wallet.balance += amount;
      await wallet.save();
  
      // Log the transaction
      const newTransaction = {
        type: 'deposit',
        amount: amount,
        paymentMethod: paymentMethod,
        date: new Date()
      };
  
      wallet.transactions.push(newTransaction);
      await wallet.save();
  
      return res.status(200).send({ message: 'Deposit successful.', walletBalance: wallet.balance });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    depositFunds,
  
};
