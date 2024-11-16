const express = require("express");
const { projectContriButionsshow } = require("./controllers/projectContriButionsshow");
const { addProjectContribution } = require("./controllers/addProjectContribution");


const router = express.Router();
router.get("/contributions/:patronId",projectContriButionsshow)
router.post("/addcontributions",addProjectContribution)

module.exports = router;
