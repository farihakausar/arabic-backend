const express = require("express");
const { login } = require("./controllers/login");

const { updateUser } = require("./controllers/updateUser");
const { deleteUser } = require("./controllers/deleteUser");
const { enableTwoFactor } = require("./controllers/enableTwoFactor");

const { signup } = require("./controllers/signup");
const { followArtist } = require("./controllers/followArtist");

const router = express.Router();

router.post("/create", signup);
router.post("/login", login);
router.patch("/update/:userId", updateUser);
router.delete("/remove/:userId", deleteUser);
router.post("/follow", followArtist);

router.post("/:userId/enable-2fa", enableTwoFactor);

module.exports = router;
