const {Exhibition}=require("../../../models/Exhibition")
const exhibitionsDetails = async (req, res) => {
    try {
      const {intermediaryId }= req.params;
      const exhibitions = await Exhibition.findById( intermediaryId )
      return res.status(200).send({ exhibitions });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    exhibitionsDetails,
};
