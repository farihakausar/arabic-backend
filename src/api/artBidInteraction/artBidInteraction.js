const express = require("express");

const { getAllBids } = require("./controllers/getAllBids");
const { getBidById } = require("./controllers/getBidById");
const { createOpenCalls } = require("./controllers/createOpenCalls");
const { submitBid } = require("./controllers/submitBid");
const { trackProjectDeadline } = require("./controllers/trackProjectDeadline");

const router = express.Router();

router.post("/create", createOpenCalls);
router.get("/allbids/:openCallId", getAllBids);
router.get("/:bidId", getBidById);
router.post("/submittedBid/:userId", submitBid);
router.get("/track",trackProjectDeadline)
module.exports = router;
