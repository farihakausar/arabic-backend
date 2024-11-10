const { Workshop } = require("../../../models/Workshop");

const getNewWorkshop = async (req, res) => {
  const daysAgo = parseInt(req.query.daysAgo) || 30;
  const onlyActive = req.query.onlyActive === "true";
  const limit = parseInt(req.query.limit) || 10; // Limit results, default to 10

  const dateThreshold = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

  try {
    const filter = {
      createdAt: { $gte: dateThreshold },
    };
    if (onlyActive) {
      filter.isActive = true;
    }

    const newWorkshops = await Workshop.find(filter)
      .sort({ createdAt: -1 }) // Sort by newest first
      .limit(limit); // Limit number of results

    return res.status(200).json(newWorkshops);
  } catch (error) {
    console.error("Error fetching new workshops:", error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve new workshops." });
  }
};

module.exports = {
  getNewWorkshop,
};
