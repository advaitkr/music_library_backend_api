const Favorite = require('../models/favoriteModel');

// Add an item to favorites
const addFavorite = async (req, res) => {
    const { item_id, type } = req.body; // item_id is the ID of the item, type can be 'artist', 'album', or 'track'
    const user_id = req.user.user_id;

    try {
        // Check if the favorite already exists
        const exists = await Favorite.findOne({ user_id, item_id, type });
        if (exists) {
            return res.status(409).json({ error: 'Item is already in favorites' });
        }

        // Add to favorites
        const favorite = new Favorite({ user_id, item_id, type });
        await favorite.save();

        res.status(201).json({ message: 'Item added to favorites', favorite });
    } catch (error) {
        console.error('Error adding favorite:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Remove an item from favorites
const removeFavorite = async (req, res) => {
    const { item_id, type } = req.body;
    const user_id = req.user.user_id;

    try {
        // Find and delete the favorite
        const favorite = await Favorite.findOneAndDelete({ user_id, item_id, type });
        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }

        res.status(200).json({ message: 'Item removed from favorites' });
    } catch (error) {
        console.error('Error removing favorite:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch all favorites for the user
const getFavorites = async (req, res) => {
    const user_id = req.user.user_id;

    try {
        // Find all favorites for the user
        const favorites = await Favorite.find({ user_id });
        res.status(200).json({ favorites });
    } catch (error) {
        console.error('Error fetching favorites:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {addFavorite,removeFavorite,getFavorites}