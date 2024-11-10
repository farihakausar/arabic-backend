// controllers/workshopController.js
const { Workshop } = require("../../../models/Workshop");
const getWorkShopById = async (req, res) => {
  // Get the workshop ID from the request parameters

  try {
    const { workshopId } = req.params;
    // Fetch the workshop by ID
    const workshop = await Workshop.findById(workshopId);

    // Check if the workshop was found
    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    // Return the workshop data
    res.status(200).json(workshop);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    res.status(500).json({ error: "Failed to fetch workshop" });
  }
};

module.exports = {
  getWorkShopById,
};
