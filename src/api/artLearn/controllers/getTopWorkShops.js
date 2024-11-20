const mongoose = require('mongoose');
const { Workshop } = require('../../../models/Workshop');

const getTopWorkShops = async (req, res) => {
  try {
    // Fetch workshops, sorted by the number of attendees in descending order
    const topWorkshops = await Workshop.aggregate([
      {
        $project: {
          name: 1,
          category: 1,
          location: 1,
          date: 1,
          instructor: 1,
          attendeesCount: { $size: "$attendees" }, // Count the number of attendees
        },
      },
      {
        $sort: { attendeesCount: -1 }, // Sort by attendees count in descending order
      },
      {
        $limit: 10, // You can adjust this number based on how many top workshops you want to return
      },
    ]);

    // Send the response with the top workshops
    res.status(200).json({
      success: true,
      data: topWorkshops,
    });
  } catch (error) {
    // Handle any errors during the database operation
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
};

module.exports = {
  getTopWorkShops,
};
