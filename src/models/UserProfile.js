const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String, required: true },
        

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        
    },
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
       
    },
    profilePicture: {
        type: String, // You might store a URL or a file path
        required: false,
        validate: {
            validator: function(v) {
                return /\.(jpeg|jpg|png)$/.test(v);
            },
            message: props => `${props.value} is not a valid image format!`
        }
    },
    location: {
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    interests: {
        type: [String], // Array of selected categories
        enum: ['Painting', 'Sculpture', 'Digital Art', 'Photography'], // Example categories
        required: false
    },
    wishlist: {
        type: [String], // Array of saved artworks, projects, or artists
        required: false
    },
    notificationsSettings: {
        email: { type: Boolean, default: true },
        inApp: { type: Boolean, default: true }
    },
    purchaseHistory: [{
        artworkId: { type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }, // Assuming you have an Artwork model
        purchaseDate: { type: Date, default: Date.now },
        price: { type: Number, required: true }
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports ={ User}
