const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// @route GET /api/listings
// @desc Get all listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listing.find();
        res.json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route POST /api/listings
// @desc Create a new listing
router.post('/', async (req, res) => {
    const listing = new Listing({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        location: req.body.location,
        available: req.body.available,
    });

    try {
        const newListing = await listing.save();
        res.status(201).json(newListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route GET /api/listings/:id
// @desc Get a single listing
router.get('/:id', getListing, (req, res) => {
    res.json(res.listing);
});

// @route PATCH /api/listings/:id
// @desc Update a listing
router.patch('/:id', getListing, async (req, res) => {
    if (req.body.title != null) {
        res.listing.title = req.body.title;
    }
    if (req.body.description != null) {
        res.listing.description = req.body.description;
    }
    if (req.body.price != null) {
        res.listing.price = req.body.price;
    }
    if (req.body.location != null) {
        res.listing.location = req.body.location;
    }
    if (req.body.available != null) {
        res.listing.available = req.body.available;
    }

    try {
        const updatedListing = await res.listing.save();
        res.json(updatedListing);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route DELETE /api/listings/:id
// @desc Delete a listing
router.delete('/:id', getListing, async (req, res) => {
    try {
        await res.listing.remove();
        res.json({ message: 'Deleted listing' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a listing by ID
async function getListing(req, res, next) {
    let listing;
    try {
        listing = await Listing.findById(req.params.id);
        if (listing == null) {
            return res.status(404).json({ message: 'Cannot find listing' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.listing = listing;
    next();
}

module.exports = router;

