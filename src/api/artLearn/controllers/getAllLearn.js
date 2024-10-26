
const { Workshop } = require('../../../models/Workshop'); // Adjust the path as necessary


const getAllLearn = async (req, res) => {
  try {
      const workshops = await Workshop.find();
      return res.status(200).json(workshops);
  } catch (error) {
      console.error('Error fetching workshops:', error);
      return res.status(500).json({ message: 'Failed to retrieve workshops.' });
  }
};

module.exports = {
  getAllLearn,
};
