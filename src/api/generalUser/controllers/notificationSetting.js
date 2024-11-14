const { User } = require("../../../models/UserProfile");


const notificationSetting = async (req, res) => {
  const { userId }= req.params  // Assuming user ID is available in the request (e.g., via JWT authentication)
  const { email, inApp } = req.body;

  try {
    // Find the user by ID and update their notification settings
    const user = await User.findByIdAndUpdate(
      userId,
      { 
        'notificationsSettings.email': email,
        'notificationsSettings.inApp': inApp
      },
      { new: true } // Return the updated user
    );

    // Check if the user was found and updated
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the updated user data (you can also just send a success message)
    res.status(200).json({
      message: 'Notification settings updated successfully',
      notificationsSettings: user.notificationsSettings
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating notification settings' });
  }
};

module.exports = {
  notificationSetting,
};
