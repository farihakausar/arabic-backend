
const { Workshop } = require('../../../models/Workshop'); // Adjust the path as necessary

// Create a new workshop
const createWorkshops = async (req, res) => {
    const { category, date, name, location, instructor, artistProfileId, duration, icon, type } = req.body;

    // Validate required fields
    if (!category || !date || !name || !location || !instructor || !artistProfileId || !duration || !type) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newWorkshop = new Workshop({
            category,
            date,
            name,
            location,
            instructor,
            artistProfileId,
            duration,
            icon,
            type
        });

        const savedWorkshop = await newWorkshop.save();
        return res.status(201).json(savedWorkshop);
    } catch (error) {
        console.error('Error creating workshop:', error);
        return res.status(500).json({ message: 'Failed to create workshop.' });
    }
};


module.exports = {
    createWorkshops,
};
