const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');
const {
    getFavoritesByCategory,
    addFavorite,
    removeFavorite,
} = require('../controllers/favoriteController');
const router = express.Router();

// Favorites routes
router.get('/:category', authenticate,getFavoritesByCategory);
router.post('/add', authenticate,addFavorite);
router.delete('/:id', authenticate,removeFavorite);

module.exports = router;
