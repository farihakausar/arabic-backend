const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// const { secKey } = require("../../../lib/exports")
// const { loginValidation } = require("../../../validation")
// const { Recruiter } = require("../../../models/recruiter")
// const { TierThree } = require("../../../models/tierThree")
// const { Interviewer } = require("../../../models/interviewer")

const login = async (req, res) => {
  // try {
  //   // Validate the request body against the defined schema
  //   const { error, value } = loginValidation.validate(req.body)
  //   if (error) {
  //     // Validation failed
  //     return res.status(400).json({
  //       message: error.details[0].message,
  //       success: false,
  //       user: null,
  //     })
  //   }

  //   // Convert the username/email to lowercase for case-insensitive search
  //   const searchKey = value.username.toLowerCase()

  //   let user = await Recruiter.findOne({
  //     username: { $regex: new RegExp("^" + searchKey + "$", "i") },
  //   }).populate({
  //     path: "circleId",
  //     select: "_id name settings",
  //   })

  //   if (!user) {
  //     user = await Interviewer.findOne({
  //       username: { $regex: new RegExp("^" + searchKey + "$", "i") },
  //     })
  //   }

  //   if (!user) {
  //     // use email as username for tier-3
  //     user = await TierThree.findOne({
  //       email: { $regex: new RegExp("^" + searchKey + "$", "i") },
  //     })
  //   }

  //   if (!user) {
  //     return res.status(404).json({
  //       success: false,
  //       message: "No user found with this username",
  //       user: null,
  //     })
  //   }

  //   if (user?.userType === "tier-3" && user?.interviewers?.length > 0) {
  //     const findIndex = user?.interviewers?.findIndex(
  //       (int) => int.isClaimed === false && int?.isActive === true
  //     )
  //     if (findIndex > -1 || user.status !== "Approved") {
  //       return res.status(403).json({
  //         success: false,
  //         message: "You are not authorized to login.",
  //         user: null,
  //       })
  //     }
  //   }

  //   const { password: p } = user
  //   const passCheck = await bcrypt.compare(value.password, p)

  //   if (!passCheck) {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Wrong password. Please try again.",
  //       user: null,
  //     })
  //   }

  //   if (user?.status !== "Approved") {
  //     return res.status(401).json({
  //       success: false,
  //       message:
  //         "Your account is not approved yet. You can log in when your account is approved.",
  //       user: null,
  //     })
  //   }

  //   const token = jwt.sign(user?._id.toString(), secKey)
  //   const localUser = user?.toJSON()
  //   delete localUser.password
  //   localUser.isBiometric = false
  //   if (value?.deviceId) {
  //     const existingFingerprint = user.fingerprints.find(
  //       (fp) => fp.deviceId === deviceId
  //     )
  //     if (existingFingerprint) {
  //       localUser.isBiometric = true
  //     }
  //   }
  //   if (localUser?.interviewers) {
  //     delete localUser.interviewers
  //   }
  //   localUser.token = token
  //   res.json({
  //     success: true,
  //     message: "LoggedIn successfully!",
  //     user: localUser,
  //   })
  // } catch (error) {
  //   const message = error.message || "We are working to fix this problem"
  //   res.status(500).json({ message, user: null, success: false })
  // }
}

module.exports = {
  login,
}

