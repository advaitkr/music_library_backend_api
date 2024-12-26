const express = require('express');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const {
    getAllAlbums,
    getAlbumById,
    addAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controllers/albumController');
const router = express.Router();

// Album routes
router.get('/', authenticate, getAllAlbums);
router.get('/:id', authenticate, authorize('Admin', 'Editor'), getAlbumById);
router.post('/add-album', authenticate, authorize('Admin', 'Editor'), addAlbum);
router.put('/:id', authenticate, authorize('Admin', 'Editor'), updateAlbum);
router.delete('/:id', authenticate, authorize('Admin', 'Editor'), deleteAlbum);

module.exports = router;
