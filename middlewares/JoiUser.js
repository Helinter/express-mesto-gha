const Joi = require('joi');

const joiUserSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  about: Joi.string().min(2).max(30),
  avatar: Joi.string().uri(),
  email: Joi.string().email(),
  password: Joi.string(),
});

module.exports = joiUserSchema;
