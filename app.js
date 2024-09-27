const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const accommodationRoutes = require('./routes/accommodationRoutes');
const listingRoutes = require('./routes/listingRoutes'); // Add the listing routes

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
    res.send('AccommodationFix API is running...');
});

// Use accommodation routes
app.use('/api/accommodations', accommodationRoutes);

// Use listing routes
app.use('/api/listings', listingRoutes); // Use listing routes

// Set the port number
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

