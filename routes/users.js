const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/auth'); // Импортируем мидлвэр для авторизации
const userController = require('../controllers/userController'); // Импортируем контроллер для пользователя

router.get('/users', authMiddleware, userController.getAllUsers);
router.patch('/users/me', authMiddleware, userController.updateProfile);
router.patch('/users/me/avatar', authMiddleware, userController.updateAvatar);
router.get('/users/me', authMiddleware, userController.getUserInfo);
router.get('/users/:userId', authMiddleware, userController.getUserById);

module.exports = router;
