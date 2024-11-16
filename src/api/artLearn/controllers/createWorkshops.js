const { Workshop } = require("../../../models/Workshop"); // Adjust the path as necessary
const { Notification } = require("../../../models/Notification");  // Assuming you have a Notification model
const { NotificationSettings } = require("../../../models/NotificationSettings");  // Assuming you have a NotificationSettings model

const createWorkshops = async (req, res) => {
  const { category, date, name, location, instructor, duration, icon, type } = req.body;

  // Validate required fields
  if (!category || !date || !name || !location || !instructor || !duration || !type) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Create a new workshop object
    const newWorkshop = new Workshop({
      category,
      date,
      name,
      location,
      instructor,
      duration,
      icon,
      type,
    });

    // Save the workshop to the database
    const savedWorkshop = await newWorkshop.save();

    // **Notification Logic**
    // Fetch users who have subscribed to workshop notifications
    const usersToNotify = await NotificationSettings.find({
      notify_new_workshop: true,
    }).populate("user");

    // Create and send notification to each user
    usersToNotify.forEach(async (setting) => {
      const user = setting.user;

      // Create a notification for the user
      const notification = new Notification({
        user: user._id,
        event_type: "new_workshop",
        message: `A new workshop titled "${newWorkshop.name}" has been created. It will be held on ${newWorkshop.date} at ${newWorkshop.location}.`,
      });

      await notification.save();

      
    });

    // Return the created workshop
    return res.status(201).json(savedWorkshop);
  } catch (error) {
    console.error("Error creating workshop:", error);
    return res.status(500).json({ message: "Failed to create workshop." });
  }
};

module.exports = {
  createWorkshops,
};
