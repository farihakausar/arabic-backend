const express = require("express")


const {createArtist}=require("./controllers/createArtist")
const {getAllArtists}=require("./controllers/getAllArtists")
const {getArtistById}=require("./controllers/getArtistById")


const router = express.Router()
router.post('/createArtist/:artistId',createArtist);

router.get('/:artistId', getArtistById);

router.get('/', getAllArtists);


module.exports = router

