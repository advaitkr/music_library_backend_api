require('dotenv').config(); // Load environment variables
const express = require('express');
const http = require('http');
const connectDB = require('./src/config/db'); // Import the DB connection
const app = require('./src/app'); // Import the app

const PORT = process.env.PORT || 3000;


connectDB();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
