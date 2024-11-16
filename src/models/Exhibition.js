const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  exhibitionTitle: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,  // Example: ensure the title is at least 3 characters long
  },
  exhibitionDate: {
    type: Date,
    required: true,
  },
  artworks: [{
    type: mongoose.Schema.Types.ObjectId,  // Assuming each artwork is referenced as an ObjectId to the Artwork model
    ref: 'Artwork',  // Link to the Artwork model, if you have one for the artworks
  }],
  location: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,  // Example: make the description at least 10 characters long
  }
}, {
  timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
});

// Create the Exhibition model from the schema
const Exhibition = mongoose.model('Exhibition', exhibitionSchema);

module.exports = {Exhibition}
