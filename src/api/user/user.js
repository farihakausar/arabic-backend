const express = require('express');
const {login}=require("./controllers/login")

const {updateUser}=require("./controllers/updateUser")
const {deleteUser}=require("./controllers/deleteUser")
const {enableTwoFactor}=require("./controllers/enableTwoFactor")

const {verifyOTP}=require("./controllers/verifyOTP")


const { signup } = require('./controllers/signup');
const { followArtist } = require('./controllers/followArtist');

const router = express.Router();

router.post('/create',signup);
router.post('/login',login);
router.put('/update/:userId', updateUser);
router.delete('/remove/:userId', deleteUser);
router.post("/follow",followArtist)

router.post('/:userId/enable-2fa', enableTwoFactor);
router.post('/:userId/verify-otp', verifyOTP);

module.exports = router;
