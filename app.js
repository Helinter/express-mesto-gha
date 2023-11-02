const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
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

// Роут для логина
app.post('/signin', userController.login);

// Роут для регистрации
app.post('/signup', userController.createUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
