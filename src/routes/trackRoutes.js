const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const {
    getAllTracks,
    getTrackById,
    addTrack,
    updateTrack,
    deleteTrack,
} = require('../controllers/trackController');
const router = express.Router();

// Track routes
router.get('/', authenticate, getAllTracks);
router.get('/:id', authenticate, authorize('Admin', 'Editor'), getTrackById);
router.post('/add-track', authenticate, authorize('Admin', 'Editor'), addTrack);
router.put('/:id', authenticate, authorize('Admin', 'Editor'), updateTrack);
router.delete('/:id', authenticate, authorize('Admin', 'Editor'), deleteTrack);

module.exports = router;
