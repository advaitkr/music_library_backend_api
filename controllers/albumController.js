const Album = require('../models/albumModel');

// Get All Albums
const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find().populate('artist', 'name'); // Populate artist details
        res.status(200).json({ success: true, albums });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Album by ID
const getAlbumById = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findById(id).populate('artist', 'name');
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }
        res.status(200).json({ success: true, album });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add New Album
const addAlbum = async (req, res) => {
    try {
        const { name, year, artist } = req.body;
        const newAlbum = new Album({ name, year, artist });
        await newAlbum.save();
        res.status(201).json({ success: true, album: newAlbum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Album
const updateAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAlbum = await Album.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedAlbum) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }
        res.status(200).json({ success: true, album: updatedAlbum });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Album
const deleteAlbum = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findByIdAndDelete(id);
        if (!album) {
            return res.status(404).json({ success: false, message: 'Album not found' });
        }
        res.status(200).json({ success: true, message: 'Album deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {getAllAlbums,getAlbumById,addAlbum,updateAlbum,deleteAlbum}