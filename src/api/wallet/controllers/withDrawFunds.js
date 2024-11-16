const {Wallet}=require("../../../models/Wallet")

const withDrawFunds = async (req, res) => {
    try {
      const { userId } = req.params;
      const { amount, bankAccountDetails } = req.body;
  
      if (amount <= 0) {
        return res.status(400).send({ message: 'Amount must be greater than zero.' });
      }
  
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).send({ message: 'Wallet not found.' });
      }
  
      if (wallet.balance < amount) {
        return res.status(400).send({ message: 'Insufficient balance.' });
      }
  
      // Deduct the withdrawal amount and platform fee
      const platformFee = amount * 0.05; // Assuming 5% fee for the platform
      const finalAmount = amount - platformFee;
      wallet.balance -= finalAmount;
      await wallet.save();
  
      // Log the withdrawal transaction
      const newTransaction = {
        type: 'withdrawal',
        amount: finalAmount,
        bankAccountDetails: bankAccountDetails,
        fee: platformFee,
        date: new Date()
      };
  
      wallet.transactions.push(newTransaction);
      await wallet.save();
  
      return res.status(200).send({ message: 'Withdrawal successful.', walletBalance: wallet.balance });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

module.exports = {
    withDrawFunds,
  
};
