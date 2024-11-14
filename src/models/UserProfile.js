const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String },
        

    username: {
        type: String,
       
        unique: true,
        trim: true
    },
    deleted:{
        type:Boolean
    },
    deletedAt:{
        type:Date
    },
    email: {
        type: String,
       
unique: true,
        lowercase: true,
        trim: true,
        
    },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArtistProfile' }], // Array of followed artist IDs
    mobileNumber: {
        type: String,
        unique: true,
       
    },
    favProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectModel' }] ,
     favArtMarket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ArtMarket' }] ,
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
       
        type: String
    },
    interests: {
        type: [String], // Array of selected categories
        enum: ['Painting', 'Sculpture', 'Digital Art', 'Photography'], // Example categories
        required: false
    },
    attendedWorkshops: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workshop" }] ,
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
        price: { type: Number, }
    }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports ={ User}
