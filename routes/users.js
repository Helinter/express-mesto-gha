const express = require('express');

const router = express.Router();
const authMiddleware = require('../middlewares/auth'); // Импортируем мидлвэр для авторизации
const userController = require('../controllers/userController'); // Импортируем контроллер для пользователя

router.get('/users', userController.getAllUsers);
router.patch('/users/me', userController.updateProfile);
router.patch('/users/me/avatar', userController.updateAvatar);
router.get('/users/me', authMiddleware, userController.getUserInfo);
router.get('/users/:userId', userController.getUserById);

module.exports = router;
