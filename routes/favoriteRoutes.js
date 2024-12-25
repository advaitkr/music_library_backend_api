const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const {
    getFavorites,
    addFavorite,
    removeFavorite,
} = require('../controllers/favoriteController');
const router = express.Router();

// Favorites routes
router.get('/', authenticate,getFavorites);
router.post('/add', authenticate,addFavorite);
router.delete('/:id', authenticate,removeFavorite);

module.exports = router;
