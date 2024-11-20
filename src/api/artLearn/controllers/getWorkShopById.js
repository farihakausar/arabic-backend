const { Workshop } = require("../../../models/Workshop");
const mongoose = require("mongoose");

const getWorkShopById = async (req, res) => {

  


  try {
    const { workshopId } = req.params;
    
    const workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json(workshop);
  } catch (error) {
    console.error("Error fetching workshop:", error);
    res.status(500).json({ error: "Failed to fetch workshop" });
  }
};

module.exports = {
  getWorkShopById,
};
