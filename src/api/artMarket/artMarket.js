const express = require("express")
const { getAllMarket } = require("./controllers/getAllMarket")
const { getMarketById } = require("./controllers/getMarketById")
const { getMostViewed } = require("./controllers/getrMostViewed")
const { getTopArtist } = require("./controllers/getTopArtist")



const router = express.Router()

router.get("/",getAllMarket)
router.get("/:id",getMarketById)
router.get("/views",getMostViewed)
router.get("/topArtist",getTopArtist)


module.exports = router

