const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
    title: { type: String, required: true },
    medium: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: Number, required: true },
    availability: { type: Boolean, default: true },
    yearOfCreation: { type: Number, required: true },
    displayOption: {
        type: String,
        enum: ['Primary Market', 'Secondary Market', 'NFTs', 'Prints & Souvenirs'],
        required: true
    },
    certificateOfAuthenticity: { type: String }, // URL or path to the certificate
    timestampRegistration: { type: String }, // URL or path to timestamp certificate
    saipRegistration: { type: String } // URL or path to SAIP registration certificate
}, { timestamps: true });

const artistProfileSchema = new mongoose.Schema({
    fullName: {
        arabic: { type: String, required: true },
        english: { type: String, required: true }
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
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
    profilePicture: {
        type: String, // URL or path to the image
        required: true
    },
    biography: {
        arabic: { type: String, required: true },
        english: { type: String, required: true }
    },
    location: {
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    socialMediaLinks: {
        instagram: { type: String },
        behance: { type: String },
        twitter: { type: String }
    },
    nationalIDNumber: {
        type: String,
        required: true,
        unique: true,
        // Consider adding a regex for ID format validation if necessary
    },
    gallery: [artworkSchema], // Array of artworks in the portfolio
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const ArtistProfile = mongoose.model('ArtistProfile', artistProfileSchema);

module.exports = {ArtistProfile};
