const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    unique: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
    minlength: 2,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
