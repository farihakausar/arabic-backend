
  
const {Wallet}=require("../../../models/Wallet")
const getWalletBalance = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).send({ message: 'Wallet not found.' });
      }
  
      return res.status(200).send({ walletBalance: wallet.balance });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
module.exports = {
    getWalletBalance,
  
};
