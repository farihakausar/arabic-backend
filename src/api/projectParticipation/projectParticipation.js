const express = require("express");

const { createProject } = require("./controllers/createProject");
const { viewProjects } = require("./controllers/viewProjects");

const { projectBidsStatus } = require("./controllers/projectBidsStatus");

const router = express.Router();

router.post("/create/:userId", createProject);
router.get("/view/:userId", viewProjects);

router.post("/:bidId", projectBidsStatus);

module.exports = router;
