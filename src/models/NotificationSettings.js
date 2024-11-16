const mongoose = require('mongoose');

const notificationSettingsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    notify_project_open_call: { type: Boolean, default: true },
    notify_new_artwork: { type: Boolean, default: true },
    notify_bid_approval: { type: Boolean, default: true },
    notify_bid_rejection: { type: Boolean, default: true },
    notify_project_approval: { type: Boolean, default: true },
    notify_artwork_sales: { type: Boolean, default: true },
    notify_workshop_event: { type: Boolean, default: true },
    notify_push_notifications: { type: Boolean, default: true }
});

const NotificationSettings = mongoose.model('NotificationSettings', notificationSettingsSchema);
module.exports ={ NotificationSettings}
