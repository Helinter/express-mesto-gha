const JoiUserSchema = require('../models/JoiUser');

const validateUserData = (req, res, next) => {
  const { error } = JoiUserSchema.validate(req.body);
  if (error) {
    const validationError = new Error(error.details[0].message);
    validationError.status = 400;
    return next(validationError);
  }
  return next();
};

module.exports = validateUserData;
