const express = require('express');

const multer = require('multer');
const {manageDisplayOptions}=require("./controllers/manageDisplayOptions")
const {uploadCertificates}=require("./controllers/uploadCertificates")
const {searchArtworks}=require("./controllers/searchArtworks")
const {createArtwork}=require("./controllers/createArtwork")
const {updateArtwork}=require("./controllers/updateArtwork")
const {deleteArtwork}=require("./controllers/deleteArtwork")
const {managePrints}=require("./controllers/managePrints")
const {logTransaction}=require("./controllers/logTransaction")
const authMiddleware = require('../../middleware/authMiddleware');
const upload = multer({ dest: 'uploads/' }); // Configure file upload settings

const router = express.Router();

router.post('/create', authMiddleware, createArtwork);
router.put('/artworks/:artworkId', authMiddleware, updateArtwork);
router.delete('/artworks/:artworkId', authMiddleware, deleteArtwork);
router.put('/artworks/:artworkId/display-options', authMiddleware, manageDisplayOptions);
router.post('/artworks/:artworkId/upload-certificates', authMiddleware, upload.array('certificates'), uploadCertificates);
router.get('/artworks/search', searchArtworks);
router.post('/transactions', authMiddleware, logTransaction);
router.put('/artworks/:artworkId/prints', authMiddleware, managePrints);

module.exports = router;
