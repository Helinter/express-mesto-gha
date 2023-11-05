const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Получаем токен из заголовков запроса
  const authHeader = req.headers.authorization;

  // Проверка наличия токена
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Unauthorized: Token is missing or invalid');
    error.status = 401;
    return next(error);
  }

  // Извлекаем токен из заголовка
  const token = authHeader.split(' ')[1];

  try {
    // Верификация токена
    const payload = jwt.verify(token, 'your_secret_key');
    // Добавление пейлоуда токена в объект запроса
    req.user = payload;

    // Продолжение выполнения запроса
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
