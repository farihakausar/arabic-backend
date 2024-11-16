const { ArtistProfile } = require("../../../models/ArtistProfile");
const manageArtist =   async (req, res) => {
    try {
      const { artistId, representationDetails } = req.body;
      const artist = await ArtistProfile.findById(artistId);
      if (!artist) return res.status(404).send({ message: 'Artist not found' });
  
      // Add or update representation details
      artist.representationDetails = representationDetails;
      await artist.save();
  
      return res.status(200).send({ message: 'Artist representation updated successfully', artist });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
module.exports = {
  manageArtist,
};
