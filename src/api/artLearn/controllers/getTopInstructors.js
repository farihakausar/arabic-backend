const { ArtistProfile } = require("../../../models/ArtistProfile");

const getTopInstructors = async (req, res) => {
  try {
    // Fetch all instructors and sort by followersCount in descending order
    const topInstructors = await ArtistProfile.find()
      .sort({ followersCount: -1 }) // Sort by followersCount in descending order
      .limit(5);  // Optional: Limit to top 5 instructors (adjust if needed)

    return res.status(200).json({
      message: "Top instructors fetched successfully",
      topInstructors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = {
  getTopInstructors,
};
