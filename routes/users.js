const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.patch('/users/me', userController.updateProfile);
router.patch('/users/me/avatar', userController.updateAvatar);

module.exports = router;
