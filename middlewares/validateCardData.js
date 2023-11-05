const joiCardSchema = require('../models/JoiCard');
// Middleware для валидации данных карточек
const validateCardData = (req, res, next) => {
  const { error } = joiCardSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    return next(validationError);
  }
  // Если данные прошли валидацию, продолжите выполнение запроса
  return next();
};

module.exports = validateCardData;
