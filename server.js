require('dotenv').config(); // Load environment variables
const express = require('express');
const connectDB = require('./config/db'); // Import the DB connection
// const app = require('./app'); // Import the app

const PORT = process.env.PORT || 3000;


connectDB();
const errorHandler = require('./middlewares/errorHandlers'); // Central error handler middleware

// Route imports
const userRoutes = require('./routes/userRoutes');
const artistRoutes = require('./routes/artistRoutes');
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const authRoutes = require('./routes/authRoutes')
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON requests


// Connect to the database
connectDB();
app.get('/hello',(req,res)=>{
    res.send({"msg":"hello server"})
})
// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
app.use('/api/v1/auth',authRoutes)
// Catch-all error handler
app.use(errorHandler);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
