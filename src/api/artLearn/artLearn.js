const express = require("express");
const { createWorkshops } = require("./controllers/createWorkshops");
const { getAllLearn } = require("./controllers/getAllLearn");
const { getWorkShopById } = require("./controllers/getWorkShopById");
const { getHighRated } = require("./controllers/getHighRated");
const { getMostAttended } = require("./controllers/getMostAttended");
const { getNewWorkshop } = require("./controllers/getNewWorkshop");
const { getTopInstructors } = require("./controllers/getTopInstructors");
const { registerUser } = require("./controllers/registerUser");
const { getTopWorkShops } = require("./controllers/getTopWorkShops");

const router = express.Router();

router.post("/create", createWorkshops);
router.get("/", getAllLearn);
router.get("/:workshopId", getWorkShopById);
router.post("/register/:userId/:workshopId", registerUser);



router.get("highRated", getHighRated);
router.get("/atteneded", getMostAttended);
router.get("/latest", getNewWorkshop);
router.get("/topInstructor", getTopInstructors);
router.get("/TopWorkShops", getTopWorkShops);


module.exports = router;
