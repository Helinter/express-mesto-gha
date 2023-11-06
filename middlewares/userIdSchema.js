const Joi = require('joi');

const userIdSchema = Joi.object({
  userId: Joi.string().hex().required(),
});

module.exports = userIdSchema;
