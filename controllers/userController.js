const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const saltRounds = 10;

exports.getAllUsers = async (_, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      res.status(400).json({ error: 'Invalid user ID' });
    } else {
      next(error);
    }
  }
};

exports.updateProfile = async (req, res, next) => {
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
      next(error);
    }
  }
};

exports.updateAvatar = async (req, res, next) => {
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
      next(error);
    }
  }
};

exports.createUser = async (req, res, next) => {
  const {
    name = 'Жак-Ив Кусто',
    about = 'Исследователь',
    avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    email,
    password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
        'your_secret_key',
        { expiresIn: '1w' },
      );
      res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.status(200).json({ success: true, user, token });
    } else {
      const error = new Error('Invalid email or password');
      error.status = 401;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

exports.getUserInfo = (req, res) => {
  const {
    _id, name, about, avatar, email,
  } = req.user;
  res.status(200).json({
    _id, name, about, avatar, email,
  });
};
