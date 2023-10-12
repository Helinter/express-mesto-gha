const Card = require('../models/Card');

exports.getAllCards = async (_, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newCard = new Card({ name, link, owner: req.user._id });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
    if (deletedCard) {
      res.json(deletedCard);
    } else {
      res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.likeCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (updatedCard) {
      res.json(updatedCard);
    } else {
      res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.dislikeCard = async (req, res) => {
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (updatedCard) {
      res.json(updatedCard);
    } else {
      res.status(404).json({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
