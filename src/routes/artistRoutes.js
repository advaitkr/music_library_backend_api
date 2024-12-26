const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const {
    getAllArtists,
    getArtistById,
    addArtist,
    updateArtist,
    deleteArtist,
} = require('../controllers/artistController');
const router = express.Router();

// Artist routes
router.get('/', authenticate, getAllArtists);
router.get('/:id', authenticate, authorize('Admin', 'Editor'), getArtistById);
router.post('/add-artist', authenticate, authorize('Admin', 'Editor'), addArtist);
router.put('/:id', authenticate, authorize('Admin', 'Editor'), updateArtist);
router.delete('/:id', authenticate, authorize('Admin', 'Editor'), deleteArtist);

module.exports = router;
