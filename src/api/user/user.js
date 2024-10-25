const express = require('express');
const {login}=require("./controllers/login")
const {createUser}=require("./controllers/createUser")
const {updateUser}=require("./controllers/updateUser")
const {deleteUser}=require("./controllers/deleteUser")
const {enableTwoFactor}=require("./controllers/enableTwoFactor")

const {verifyOTP}=require("./controllers/verifyOTP")

const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/create',createUser);
router.put('/update/:userId', updateUser);
router.delete('/remove/:userId', deleteUser);
router.post('/login',login);
router.post('/:userId/enable-2fa', enableTwoFactor);
router.post('/:userId/verify-otp', verifyOTP);

module.exports = router;
