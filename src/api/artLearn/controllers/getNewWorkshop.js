
const { Workshop } = require('../../../models/Workshop'); // Adjust the path as necessary

const getNewWorkshop = async (req, res) => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    try {
        const newWorkshops = await Workshop.find({ createdAt: { $gte: thirtyDaysAgo } });
        return res.status(200).json(newWorkshops);
    } catch (error) {
        console.error('Error fetching new workshops:', error);
        return res.status(500).json({ message: 'Failed to retrieve new workshops.' });
    }
};

module.exports = {
    getNewWorkshop,
};
