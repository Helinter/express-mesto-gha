const express = require('express');

const validateUserData = require('../middlewares/validateUserData');
const validateUserId = require('../middlewares/validateUserId');

const router = express.Router();
const authMiddleware = require('../middlewares/auth'); // Импортируем мидлвэр для авторизации
const userController = require('../controllers/userController'); // Импортируем контроллер для пользователя

router.get('/users', authMiddleware, userController.getAllUsers);
router.patch('/users/me', authMiddleware, validateUserData, userController.updateProfile);
router.patch('/users/me/avatar', authMiddleware, validateUserData, userController.updateAvatar);
router.get('/users/me', authMiddleware, userController.getUserInfo);
router.get('/users/:userId', authMiddleware, validateUserId, userController.getUserById);

module.exports = router;
