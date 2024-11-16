const {Exhibition}=require("../../../models/Exhibition")
const addExhibiion =  async (req, res) => {
    try {
      const { exhibitionTitle, exhibitionDate, artworks, location, description } = req.body;
  
      const newExhibition = new Exhibition({
        exhibitionTitle,
        exhibitionDate,
        artworks,
        location,
        description
      });
  
      await newExhibition.save();
      return res.status(200).send({ message: 'Exhibition added successfully', exhibition: newExhibition });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
}
  
module.exports = {
    addExhibiion,
};
