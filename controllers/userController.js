const mongoose = require('mongoose');

const User = require('../models/User');

exports.getAllUsers = async (_, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      // Обработка ошибки CastError (некорректный ID)
      res.status(400).json({ error: 'Invalid user ID' });
    } else {
      // Обработка других ошибок
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid data provided' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid data provided' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

exports.createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    const newUser = new User({ name, about, avatar });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Invalid data provided' });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};
