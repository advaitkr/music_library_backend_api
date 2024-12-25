const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const favoriteSchema = new mongoose.Schema({
    favorite_id: { type: String, default: uuidv4, unique: true },
    user_id: { type: String, required: true },
    item_id: { type: String, required: true }, // ID of the favorite item (artist, album, or track)
    type: { type: String, enum: ['artist', 'album', 'track'], required: true },
});
module.exports = mongoose.model('Favorite', favoriteSchema);

