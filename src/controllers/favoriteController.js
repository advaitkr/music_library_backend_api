const Favorite = require('../models/favoriteModel');

// Add an item to favorites


// Get all favorites for a given category (artist, album, or track)
const getFavoritesByCategory = async (req, res) => {
    const { category } = req.params;
    const { user_id } = req.user; // Assuming `user_id` is available after authentication

    if (!['artist', 'album', 'track'].includes(category)) {
        return res.status(400).json({ success: false, message: 'Invalid category' });
    }

    try {
        const favorites = await Favorite.find({ user_id, type: category });
        return res.status(200).json({ success: true, data: favorites });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
const { v4: uuidv4 } = require('uuid');

// Add a favorite (artist, album, or track)
const addFavorite = async (req, res) => {
    const { user_id } = req.user; // Assuming `user_id` is available after authentication
    const { item_id, type } = req.body; // item_id is the ID of the artist/album/track, and type is the category

    if (!['artist', 'album', 'track'].includes(type)) {
        return res.status(400).json({ success: false, message: 'Invalid type' });
    }

    try {
        const newFavorite = new Favorite({
            favorite_id: uuidv4(),
            user_id,
            item_id,
            type
        });

        await newFavorite.save();
        return res.status(201).json({ success: true, message: 'Favorite added successfully', data: newFavorite });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

const removeFavorite = async (req, res) => {
    const { user_id } = req.user; // Assuming `user_id` is available after authentication
    const { id } = req.params; // Favorite ID to be removed

    try {
        const favorite = await Favorite.findOneAndDelete({ user_id, favorite_id: id });
        if (!favorite) {
            return res.status(404).json({ success: false, message: 'Favorite not found' });
        }

        return res.status(200).json({ success: true, message: 'Favorite removed successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {getFavoritesByCategory,addFavorite,removeFavorite}