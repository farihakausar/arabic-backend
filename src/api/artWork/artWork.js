const express = require('express');

const multer = require('multer');
const {manageDisplayOptions}=require("./controllers/manageDisplayOptions")
const {uploadCertificates}=require("./controllers/uploadCertificates")
const {searchArtworks}=require("./controllers/searchArtworks")
const {createArtwork}=require("./controllers/createArtwork")
const {updateArtwork}=require("./controllers/updateArtwork")
const {deleteArtwork}=require("./controllers/deleteArtwork")

const {logTransaction}=require("./controllers/logTransaction")


const router = express.Router();

router.post('/create/:artistId',  createArtwork);
router.patch('/artworks/:artworkId', updateArtwork);
router.delete('/delete/:artworkId',  deleteArtwork);
router.patch('/:artworkId/display-options', manageDisplayOptions);
router.post("/:artworkId/upload-certificates",  uploadCertificates);
router.get('/search', searchArtworks);
router.post('/transactions',  logTransaction);


module.exports = router;
