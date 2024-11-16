const { OpenCalls } = require("../../../models/OpenCalls");
const { ProjectModel } = require("../../../models/ProjectModel");
const { PatronProfile } = require("../../../models/PatronProfile");
const { Notification } = require("../../../models/Notification");  // Assuming you have a Notification model
const { NotificationSettings } = require("../../../models/NotificationSettings"); // Assuming you have a NotificationSettings model

// Create open call API with patron role validation
const createOpenCalls = async (req, res) => {
  const {
    projectId,
    hostedBy,
    description,
    timeline,
    price,
    eligibiltyCreteria,
    image,
    goals,
    name,
    overview,
    bidRequirements,
    keyDates,
  } = req.body;

  try {
    // Validate required fields
    if (
      !projectId ||
      !hostedBy ||
      !description ||
      !timeline ||
      !price ||
      !goals ||
      !name
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if the hostedBy user exists and has the "patron" role
    const user = await PatronProfile.findById(hostedBy);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new open call
    const newOpenCall = new OpenCalls({
      projectId,
      hostedBy,
      description,
      timeline,
      price,
      eligibiltyCreteria,
      image,
      goals,
      name,
      overview,
      bidRequirements,
      keyDates,
    });

    // Save the new open call to the database
    await newOpenCall.save();

    // Update the project with the new open call's ID
    await ProjectModel.findByIdAndUpdate(
      projectId,
      {
        $push: { openCalls: newOpenCall._id },
      },
      { new: true } // Returns the updated project
    );

    // **Notification Logic**
    // Fetch users who have subscribed to open call notifications
    const usersToNotify = await NotificationSettings.find({
      notify_project_open_call: true,
    }).populate("user");

    // Send notification to each user
    usersToNotify.forEach(async (setting) => {
      const user = setting.user;

      // Create a notification for each user
      const notification = new Notification({
        user: user._id,
        event_type: "new_open_call",
        message: `A new open call has been created for the project "${name}".`,
      });

      await notification.save();

      // Optionally, send a push notification/email, etc.
      // For push notifications, you can use a service like FCM or APNS.
      sendPushNotification(user, notification.message); // Implement your push notification service
      sendEmailNotification(user.email, notification.message); // Implement your email service
    });

    // Return the created open call
    return res.status(201).json(newOpenCall);
  } catch (error) {
    console.error("Error creating open call:", error);
    return res.status(500).json({ error: "Failed to create open call" });
  }
};

module.exports = {
  createOpenCalls,
};
