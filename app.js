const express = require('express');

const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const handleErrors = require('./middlewares/errorMiddleware'); // Импортируем мидлвэр для обработки ошибок

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb';

app.use(helmet());
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.json());

const userRouter = require('./routes/users');
const userController = require('./controllers/userController');

app.use(userRouter);

const cardRouter = require('./routes/cards');

app.use(cardRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// Роут для логина
app.post('/signin', userController.login);

// Роут для регистрации
app.post('/signup', userController.createUser);

app.use(errors());

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Подключаем мидлвэр для обработки ошибок
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
