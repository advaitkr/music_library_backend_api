const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/errorHandlers')
const authMiddleware = require('./middlewares/authMiddleware')
// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes')
const artistRoutes = require('./routes/artistRoutes')
const albumRoutes = require('./routes/albumRoutes');
const trackRoutes = require('./routes/trackRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes')

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(errorHandler)
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/albums', albumRoutes);
app.use('/api/v1/tracks', trackRoutes);
app.use('/api/v1/favorites', favoriteRoutes);
app.use('/api/v1/auth',authRoutes)


module.exports = app