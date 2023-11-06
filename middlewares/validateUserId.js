const { celebrate, Segments } = require('celebrate');
const userIdSchema = require('./userIdSchema'); // Путь к схеме userId

const validateUserId = celebrate({
  [Segments.PARAMS]: userIdSchema,
});

module.exports = validateUserId;
