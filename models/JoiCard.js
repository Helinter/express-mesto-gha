const Joi = require('joi');

const joiCardSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  link: Joi.string(),
  owner: Joi.string(),
  likes: Joi.array().items(Joi.string()).default([]),
});

module.exports = joiCardSchema;
