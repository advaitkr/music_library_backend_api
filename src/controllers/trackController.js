const Track = require('../models/trackModel');

// Get All Tracks
const getAllTracks = async (req, res) => {
    try {
        const tracks = await Track.find()
          .populate('album_id', 'name')  // Populate album details
          .populate('artist_id', 'name');  // Populate artist details
        res.status(200).json({ success: true, data: tracks });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
      }
};

// Get Track by ID
const getTrackById = async (req, res) => {
    try {
        const track = await Track.findById(req.params.id)
          .populate('album_id', 'name')
          .populate('artist_id', 'name');
        
        if (!track) {
          return res.status(404).json({ success: false, message: 'Track not found' });
        }
        
        res.status(200).json({ success: true, data: track });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
      }
};

// Add New Track
const addTrack = async (req, res) => {
    const { track_id, name, duration, hidden, album_id, artist_id } = req.body;
  
  try {
    const track = new Track({
      track_id,
      name,
      duration,
      hidden,
      album_id,
      artist_id,
    });
    
    await track.save();
    res.status(201).json({ success: true, message: 'Track created successfully', data: track });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update Track
const updateTrack = async (req, res) => {
    try {
        const track = await Track.findByIdAndUpdate(req.params.id, {
          name,
          duration,
          hidden,
          album_id,
          artist_id,
        }, { new: true });
        
        if (!track) {
          return res.status(404).json({ success: false, message: 'Track not found' });
        }
        
        res.status(204).json({ success: true, message: 'Track updated successfully' });
      } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });
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