// database/db.js
const mongoose = require("mongoose")

const initializeDatabase = () => {
  const dbUrl = "mongodb+srv://Azhan:azhan12345@cluster0.5irtpas.mongodb.net/preferental-app?retryWrites=true&w=majority"

  mongoose.connect(dbUrl, {})

  const db = mongoose.connection

  db.on("error", () => {
    console.error.bind(console, "MongoDB connection error:")
    process.exit(1)
  })
  db.once("open", () => {
    console.log("Connected to the database")
  })
}

module.exports = { initializeDatabase }
