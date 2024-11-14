const express = require('express');


const {favArtist}=require("./controllers/favArtist")
const {favMarket}=require("./controllers/favMarket")
const {favProject}=require("./controllers/favProject")
const {notificationSetting}=require("./controllers/notificationSetting");
const { purchaseMarket } = require('./controllers/puchaseMarket');



const router = express.Router();


router.post('/notifications/:userId', notificationSetting);
router.post('/favProjects/:userId',  favProject);
router.post('/favArtists/:userId', favArtist);
router.post('/favMarket/:userId',  favMarket);
router.post("/purchaseMarket",purchaseMarket)
module.exports = router;
