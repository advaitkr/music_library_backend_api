const express = require('express');
const {authenticate,authorize} = require('../middlewares/authMiddleware')
const {
    getAllUsers,
    addUser,
    deleteUser,
    updatePassword
} = require('../controllers/userController')
const router = express.Router()
router.get('/',authenticate,authorize('Admin'),getAllUsers);
router.post('/add-user',authenticate,authorize('Admin'),addUser);
router.delete('/:id',authenticate,authorize('Admin'),deleteUser);
router.put('/update-password',authenticate,updatePassword);

module.exports = router;