const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getAllUsers);
router.get('/users/:userId', userController.getUserById);
router.post('/users', userController.createUser);
router.patch('/users/me', userController.updateProfile);
router.patch('/users/me/avatar', userController.updateAvatar);

module.exports = router;
