const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    medium: { type: String },
    size: { type: String },
    price: { type: Number },
    availability: {
      type: String,
      enum: ["available", "sold", "on hold"],
      default: "available",
    },
    yearOfCreation: { type: Number },
    displayOption: {
      type: String,
      enum: [
        "Primary Market",
        "Secondary Market",
        "NFTs",
        "Prints & Souvenirs",
      ],
      required: true,
    },
    artistId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    certificates: [{ type: String }], // URLs or
    timestampRegistration: { type: String }, // URL or path to timestamp certificate
    saipRegistration: { type: String }, // URL or path to SAIP registration certificate
  },
  { timestamps: true }
);

const artistProfileSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    isProfileComplete: {
      type: Boolean,
    },
    skills: [{ type: String }], // Array of skills
    experience: [
      {
        role: { type: String },
        organization: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String },
      },
    ], // Array of experience objects
    exhibitions: [
      {
        title: { type: String },
        year: { type: Number },
        location: { type: String },
        description: { type: String },
      },
    ], // Array of exhibitions objects
    achievements: [{ type: String }], // Array of achievements
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: Number },
      },
    ], // Array of education objects
    digitalTools: [{ type: String }], // Array of digital tools used
    portfolioImages: [{ type: String }],
    followersCount: {
      type: Number,
      default: 0, // Default to 0
    },
    profileViews: {
      type: Number,
      default: 0, // Default to 0
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    appreciationCount: {
      type: Number,
      default: 0, // Default to 0
    },
    services: {
      name: { type: String },
      serviceTime: { type: String },
      delivery: { type: String },
    }, // Service details

    events: [
      {
        images: [{ type: String }], // Array of image URLs
        likes: { type: Number, default: 0 }, // Number of likes
        views: { type: Number, default: 0 }, // Number of views
        year: { type: Number }, // Year of the event
        displayOption: {
          type: String,
          enum: [
            "Primary Market",
            "Secondary Market",
            "NFTs",
            "Prints & Souvenirs",
          ],
          required: true,
        },
      },
    ],
    username: {
      type: String,
    },
    website: {
      type: String,
    },
    deleted: {
      type: Boolean,
    },
    deletedAt: {
      type: Date,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },

    profilePicture: {
      type: String,
    },

    servicePicture: {
      type: String,
    },
    biography: {
      type: String,
    },
    location: {
      type: String,
    },

    socialMediaLinks: {
      instagram: { type: String },
      behance: { type: String },
      twitter: { type: String },
    },
    nationalIDNumber: {
      type: String,

      unique: true,
    },
    gallery: [artworkSchema], // Array of artworks in the portfolio
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const ArtistProfile = mongoose.model("ArtistProfile", artistProfileSchema);

module.exports = { ArtistProfile, artworkSchema };
