

const { Workshop } = require('../../../models/Workshop'); 
const getHighRated = async (req, res) => {
    try {
        const highRatedWorkshops = await Workshop.find({ type: 'High Rated' });
        return res.status(200).json(highRatedWorkshops);
    } catch (error) {
        console.error('Error fetching high-rated workshops:', error);
        return res.status(500).json({ message: 'Failed to retrieve high-rated workshops.' });
    }
};

module.exports = {
    getHighRated,
};
