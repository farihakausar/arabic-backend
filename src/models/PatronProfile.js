const mongoose = require("mongoose");

const patronProfileSchema = new mongoose.Schema(
  {
    organisationName: {
      arabic: { type: String },
      english: { type: String },
    },
    emailAddress: {
      type: String,

      unique: true,
      match: /.+\@.+\..+/, // Basic email validation
    },
    mobileNumber: {
      type: String,

      unique: true,
      match: /^\+?[0-9]{10,15}$/, // Adjust regex based on the mobile format you need
    },
    fullName: { type: String },
    idNumber: { type: String },
    mobileNumber: {
      type: String,

      match: /^\+?[0-9]{10,15}$/, // Adjust regex based on the mobile format you need
    },
    emailAddress: {
      type: String,

      match: /.+\@.+\..+/, // Basic email validation
    },
    nationalAddress: { type: String },
    authorizationDocument: { type: String }, // URL or path to the uploaded document// Embedded document for representative details
    commercialRegistrationDetails: {
      type: String,
      // URL or path to the commercial registration document
    },
    licenses: [
      {
        type: String, // Array of URLs or paths to any relevant licenses
      },
    ],
    aboutUs: {
      arabic: { type: String },
      english: { type: String },
    },
    preferredArtCategories: {
      type: [String], // Multi-select categories
      enum: [
        "Painting",
        "Sculpture",
        "Photography",
        "Digital Art",
        "Mixed Media",
      ], // Add more categories as needed
      default: [],
    },
    budgetPreferences: {
      min: { type: Number }, // Minimum budget
      max: { type: Number }, // Maximum budget
    },
    location: {
      city: { type: String },
      country: { type: String },
    },
    socialMediaLinks: {
      instagram: { type: String },
      facebook: { type: String },
      other: { type: String }, // Any other relevant platforms
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const PatronProfile = mongoose.model("PatronProfile", patronProfileSchema);

module.exports = { PatronProfile };
