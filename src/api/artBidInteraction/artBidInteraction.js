const express = require("express")

const { getAllBids } = require("./controllers/getAllBids")
const { getBidById } = require("./controllers/getBidById")
const { createOpenCalls } = require("./controllers/createOpenCalls")

const router = express.Router()

router.post("/create", createOpenCalls)
router.get("/", getAllBids)
router.get("/:bidId", getBidById)

module.exports = router

