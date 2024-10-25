const express = require('express');

const {createProject}=require("./controllers/createProject")
const {viewProjects}=require("./controllers/viewProjects")
const {submitBid}=require("./controllers/submitBid")
const {manageBids}=require("./controllers/manageBids")

const {projectHistory}=require("./controllers/projectHistory")
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createProject);
router.get('/view', viewProjects);
router.post('/bids', authMiddleware,submitBid);
router.put('/bids/:projectId/:bidId/:action', authMiddleware, manageBids);
router.get('/projects/:projectId/history',projectHistory);

module.exports = router;
