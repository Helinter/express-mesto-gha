const Joi = require('joi');

const joiUserSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  avatar: Joi.string().uri(),
});

module.exports = joiUserSchema;
