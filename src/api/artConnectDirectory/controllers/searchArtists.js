const { ArtistProfile } = require('../../../models/ArtistProfile');
// /artists?skills=Calligraphy,Drawing&location=Riyadh&availability=Immediately Available
const searchArtists = async (req, res) => {
  try {
    const {
      skills,             // Skills like 'Calligraphy', 'Drawing', etc.
      experience,         // Experience level: 'Beginner', 'Intermediate', etc.
      location,           // Location filter, e.g., 'Riyadh', 'Jeddah', etc.
      budget,             // Budget filter: 'Under 1,000 SAR', etc.
      availability,       // Availability filter: 'Immediately Available', etc.
    } = req.query;

    // Build the query object based on the provided filters
    let query = { isProfileComplete: true };

    // Apply filters if provided
    if (skills) {
      query.skills = { $in: skills.split(',') };  // skills filter: comma-separated string
    }
    if (experience) {
      query.experience = { $elemMatch: { role: experience } };  // Filter by experience role
    }
    if (location) {
      query.location = { $regex: new RegExp(location, 'i') };  // Case-insensitive location search
    }
    if (budget) {
      query['services.price'] = { $lte: parseInt(budget) };  // Filter by price if budget is provided
    }
    if (availability) {
      query.availability = availability;  // Filter by availability status
    }

    // Fetch the artists based on the search query
    const artists = await ArtistProfile.find(query);

    // Return the filtered artists
    res.status(200).json(artists);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  searchArtists,
};
