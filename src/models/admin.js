const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true, // Make the username field unique
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    adminType: {
      type: String,
      default: "super",
    },
  },
  { collection: "admins", strict: false, timestamps: true }
)

const Admin = mongoose.model("admins", adminSchema)

module.exports = {
  Admin,
}
