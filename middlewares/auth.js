const jwt = require('jsonwebtoken');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Token is missing or invalid'));
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, 'your_secret_key');
    req.user = payload;
    return next();
  } catch (error) {
    return next(new UnauthorizedError('Invalid token'));
  }
};

module.exports = authMiddleware;
