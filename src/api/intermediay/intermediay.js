const express = require('express');

const multer = require('multer');

const { manageArtist } = require('./controllers/manageArtist');
const { addExhibiion } = require('./controllers/addExhibiion');
const { galleryAgency } = require('./controllers/galleryAgency');
const { exhibitionsDetails } = require('./controllers/exhibitionsDetails');
const { updateInfoExhibtion } = require('./controllers/updateInfoExhibtion');


const router = express.Router();

router.post('/manage-artists', manageArtist)
router.post('/add-exhibition',addExhibiion)
router.get('/artists/:intermediaryId',galleryAgency)
router.get('/exhibitions/:intermediaryId',exhibitionsDetails)
router.patch("/update/:exhibitionId",updateInfoExhibtion)
   

module.exports = router;
