const Track = require('../models/trackModel');

// Get All Tracks
const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find().populate('album artist', 'name'); // Populate album and artist details
        res.status(200).json({ success: true, tracks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Track by ID
const getTrackById = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await Track.findById(id).populate('album artist', 'name');
        if (!track) {
            return res.status(404).json({ success: false, message: 'Track not found' });
        }
        res.status(200).json({ success: true, track });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Add New Track
const addTrack = async (req, res) => {
    try {
        const { name, duration, album, artist } = req.body;
        const newTrack = new Track({ name, duration, album, artist });
        await newTrack.save();
        res.status(201).json({ success: true, track: newTrack });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Track
const updateTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTrack = await Track.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedTrack) {
            return res.status(404).json({ success: false, message: 'Track not found' });
        }
        res.status(200).json({ success: true, track: updatedTrack });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Track
const deleteTrack = async (req, res) => {
    try {
        const { id } = req.params;
        const track = await Track.findByIdAndDelete(id);
        if (!track) {
            return res.status(404).json({ success: false, message: 'Track not found' });
        }
        res.status(200).json({ success: true, message: 'Track deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {getAllTracks,getTrackById,addTrack,updateTrack,deleteTrack}