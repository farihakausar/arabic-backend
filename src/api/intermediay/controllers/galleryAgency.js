const { PatronProfile } = require("../../../models/PatronProfile");
const galleryAgency = async (req, res) => {
    try {
      const {intermediaryId} = req.params;
      const intermediary = await PatronProfile.findById(intermediaryId).populate('artists');
      if (!intermediary) return res.status(404).send({ message: 'Gallery/Agency not found' });
  
      return res.status(200).send({ artists: intermediary.artists });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
module.exports = {
    galleryAgency,
};
