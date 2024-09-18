const express = require('express');
const dotenv = require('dotenv');

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Basic route to test the server
app.get('/', (req, res) => {
    res.send('AccommodationFix API is running...');
});

// Set the port number
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

