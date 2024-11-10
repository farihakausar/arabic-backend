const express = require("express");

const { getAllBids } = require("./controllers/getAllBids");
const { getBidById } = require("./controllers/getBidById");
const { createOpenCalls } = require("./controllers/createOpenCalls");
const { submitBid } = require("./controllers/submitBid");

const router = express.Router();

router.post("/create", createOpenCalls);
router.get("/allbids/:openCallId", getAllBids);
router.get("/:bidId", getBidById);
router.post("/submittedBid/:userId", submitBid);
module.exports = router;
