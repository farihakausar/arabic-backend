const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    event_type: {
        type: String,
        enum: [
            'new_project', 
            'new_artwork', 
            'bid_approval', 
            'bid_rejection',
            'project_approval', 
            'artwork_sale', 
            'workshop_event'
        ],
        required: true
    },
    message: { type: String, required: true },
    status: { type: String, enum: ['unread', 'read'], default: 'unread' },
    timestamp: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = {Notification};
