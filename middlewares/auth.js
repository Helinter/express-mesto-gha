require('dotenv').config();

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET.trim();
console.log(JWT_SECRET)

const UnauthorizedError = require('./UnauthorizedError');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Token is missing or invalid'));
  }

  const token = authHeader.split(' ')[1];


  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    console.error('Verification error:', error.message);
    return next(new UnauthorizedError('Invalid token'));
  }
};


module.exports = authMiddleware;
