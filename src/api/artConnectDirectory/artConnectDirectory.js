const express = require("express");

const { createArtist } = require("./controllers/createArtist");
const { getAllArtists } = require("./controllers/getAllArtists");
const { getArtistById } = require("./controllers/getArtistById");
const { profileViewCount } = require("./controllers/profileViewCount");
const { appreciationCount } = require("./controllers/appreciationCount");
const { searchArtists } = require("./controllers/searchArtists");

const router = express.Router();
router.post("/createArtist/:artistId", createArtist);

router.get("/:artistId", getArtistById);

router.get("/", getAllArtists);
router.get("/profileCount/:artistId", profileViewCount);
router.get("/appreciation/:artistId", appreciationCount);
router.get("/serach",searchArtists)
module.exports = router;
