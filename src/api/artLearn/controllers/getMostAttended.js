

const { Workshop } = require("../../../models/Workshop"); 
const getMostAttended = async (req, res) => {
  try {
    // Fetch all workshops and populate the attendees array
    const workshops = await Workshop.find().populate('attendees');

    // Sort workshops by the number of attendees (in descending order)
    workshops.sort((a, b) => b.attendees.length - a.attendees.length);

    // Optionally, you can limit the number of workshops returned if needed
    const mostAttendedWorkshops = workshops.slice(0, 5);  // Get top 5 most attended workshops

    return res.status(200).json({
      message: "Most attended workshops fetched successfully",
      mostAttendedWorkshops,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  getMostAttended,
};
