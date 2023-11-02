const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

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
      res.status(400).json({ error: 'Invalid user IDооо' });
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
  const {
    name = 'Жак-Ив Кусто', about = 'Исследователь', avatar = 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png', email, password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name, about, avatar, email, password: hashedPassword,
    });
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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Поиск пользователя по email
    const user = await User.findOne({ email });
    // Проверка, найден ли пользователь и совпадает ли пароль
    if (user && await bcrypt.compare(password, user.password)) {
      // Создание JWT токена с payload { _id: user._id }
      const token = jwt.sign({
        _id: user._id,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }, 'your_secret_key', { expiresIn: '1w' });
      // Отправка JWT в httpOnly куке
      res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

      // Возвращаем успешный статус, данные пользователя и токен
      res.status(200).json({ success: true, user, token });
    } else {
      // Если пользователь не найден или пароль неверный, отправляем ошибку 401
      res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
  } catch (error) {
    // В случае ошибки отправляем ошибку 500
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

exports.getUserInfo = (req, res) => {
  // Получаем информацию о текущем пользователе из объекта запроса (req.user)
  const {
    _id, name, about, avatar, email,
  } = req.user;

  // Возвращаем информацию о пользователе в ответе
  res.status(200).json({
    _id, name, about, avatar, email,
  });
};
