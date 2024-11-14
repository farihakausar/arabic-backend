const { Workshop } = require("../../../models/Workshop"); 
const { User } = require("../../../models/UserProfile");  // Assuming you have a User model

const registerUser = async (req, res) => {
  try {
    const { userId,workshopId } = req.params; // ID of the workshop to register for
 
    // Find the workshop by ID
    const workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Check if user is already registered (to prevent duplicate entries)
    if (workshop.attendees.includes(userId)) {
      return res.status(400).json({ message: "User already registered for this workshop" });
    }

    // Add the user to the attendees array
    workshop.attendees.push(userId);

    // Save the updated workshop
    await workshop.save();

    // Optionally, you can also update the user's profile to add the workshop ID to their attended workshops list
    const user = await User.findById(userId);
    if (user) {
      user.attendedWorkshops.push(workshopId); // Assuming User schema has an 'attendedWorkshops' array
      await user.save();
    }

    return res.status(200).json({ message: "User registered for the workshop successfully", workshop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  registerUser,
};
