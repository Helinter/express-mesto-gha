const express = require('express');

const authMiddleware = require('../middlewares/auth');

const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/cards', cardController.getAllCards);
router.post('/cards', authMiddleware, cardController.createCard);
router.delete('/cards/:cardId', authMiddleware, cardController.deleteCard);
router.put('/cards/:cardId/likes', cardController.likeCard);
router.delete('/cards/:cardId/likes', cardController.dislikeCard);

module.exports = router;
