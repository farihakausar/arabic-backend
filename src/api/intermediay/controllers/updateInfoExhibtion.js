const {Exhibition }= require("../../../models/Exhibition");

const updateInfoExhibtion = async (req, res) => {
  try {
    const { exhibitionId } = req.params;  // Get the exhibition ID from the route parameters
    const { exhibitionTitle, exhibitionDate, artworks, location, description } = req.body; // Get updated data from the request body

    // Find the exhibition by ID
    const exhibition = await Exhibition.findById(exhibitionId);

    // Check if exhibition exists
    if (!exhibition) {
      return res.status(404).send({ message: 'Exhibition not found.' });
    }

    // Update the exhibition fields with the new data
    if (exhibitionTitle) exhibition.exhibitionTitle = exhibitionTitle;
    if (exhibitionDate) exhibition.exhibitionDate = exhibitionDate;
    if (artworks) exhibition.artworks = artworks;  // Assume artworks is an array of ObjectIds
    if (location) exhibition.location = location;
    if (description) exhibition.description = description;

    // Save the updated exhibition
    await exhibition.save();

    // Send response with the updated exhibition
    return res.status(200).send({
      message: 'Exhibition updated successfully.',
      exhibition: exhibition,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  updateInfoExhibtion,
};
