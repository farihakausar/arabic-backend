const { BidModel } = require('../../../models/BidModel'); // Adjust the path as needed

const createOpenCalls = async (req, res) => {
    const {
        projectId,
        hostedBy,
        description,
        timeline,
        price,
        eligibiltyCreteria,
        image,
        goals,
        name,
        overview,
        bidRequirements,
        keyDates,
    } = req.body;

    try {
        // Validate required fields
        if (!projectId || !hostedBy || !description || !timeline || !price || !goals || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create a new bid
        const newBid = new BidModel({
            projectId,
            hostedBy,
            description,
            timeline,
            price,
            eligibiltyCreteria,
            image,
            goals,
            name,
            overview,
            bidRequirements,
            keyDates,
        });

        // Save the bid to the database
        await newBid.save();

        // Return the created bid
        return res.status(201).json(newBid);
    } catch (error) {
        console.error('Error creating open call:', error);
        return res.status(500).json({ error: 'Failed to create open call' });
    }
};

module.exports = {
    createOpenCalls,
};
