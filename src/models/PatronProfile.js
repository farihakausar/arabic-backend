const mongoose = require('mongoose');

const authorizedRepresentativeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    idNumber: { type: String, required: true },
    mobileNumber: {
        type: String,
        required: true,
        match: /^\+?[0-9]{10,15}$/ // Adjust regex based on the mobile format you need
    },
    emailAddress: {
        type: String,
        required: true,
        match: /.+\@.+\..+/ // Basic email validation
    },
    nationalAddress: { type: String, required: true },
    authorizationDocument: { type: String, required: true } // URL or path to the uploaded document
}, { timestamps: true });

const patronProfileSchema = new mongoose.Schema({
    organisationName: {
        arabic: { type: String, required: true },
        english: { type: String, required: true }
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/ // Basic email validation
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\+?[0-9]{10,15}$/ // Adjust regex based on the mobile format you need
    },
    authorizedRepresentative: authorizedRepresentativeSchema, // Embedded document for representative details
    commercialRegistrationDetails: { 
        type: String, 
        required: true // URL or path to the commercial registration document
    },
    licenses: [{ 
        type: String // Array of URLs or paths to any relevant licenses
    }],
    aboutUs: {
        arabic: { type: String, required: true },
        english: { type: String, required: true }
    },
    preferredArtCategories: {
        type: [String], // Multi-select categories
        enum: ['Painting', 'Sculpture', 'Photography', 'Digital Art', 'Mixed Media'], // Add more categories as needed
        default: []
    },
    budgetPreferences: {
        min: { type: Number, required: true }, // Minimum budget
        max: { type: Number, required: true }  // Maximum budget
    },
    location: {
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    socialMediaLinks: {
        instagram: { type: String },
        facebook: { type: String },
        other: { type: String } // Any other relevant platforms
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const PatronProfile = mongoose.model('PatronProfile', patronProfileSchema);

module.exports = PatronProfile;
