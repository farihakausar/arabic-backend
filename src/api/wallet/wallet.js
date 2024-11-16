const express = require("express");
const { walletTrasactions } = require("./controllers/walletTrasactions");
const { getWalletBalance } = require("./controllers/getWalletBalance");
const { transferFunds } = require("./controllers/transferFunds");
const { withDrawFunds } = require("./controllers/withDrawFunds");
const { depositFunds } = require("./controllers/depositFunds");


const router = express.Router();

router.post('/:userId/deposit',depositFunds)

router.post('/:userId/withdraw',withDrawFunds)
router.post('/transfer',transferFunds)
router.get('/:userId/balance',getWalletBalance)
router.get('/:userId/transactions',walletTrasactions)

module.exports = router;
