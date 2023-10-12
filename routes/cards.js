const express = require('express');

const router = express.Router();
const cardController = require('../controllers/cardController');

router.get('/cards', cardController.getAllCards);
router.post('/cards', cardController.createCard);
router.delete('/cards/:cardId', cardController.deleteCard);
router.put('/cards/:cardId/likes', cardController.likeCard);
router.delete('/cards/:cardId/likes', cardController.dislikeCard);

module.exports = router;
