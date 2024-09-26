const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');

// @route   POST /api/accommodations
// @desc    Create a new accommodation
router.post('/', async (req, res) => {
    try {
        const newAccommodation = new Accommodation(req.body);
        const accommodation = await newAccommodation.save();
        res.json(accommodation);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/accommodations
// @desc    Get all accommodations
router.get('/', async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.json(accommodations);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Other routes for updating and deleting accommodations can be added here

module.exports = router;

