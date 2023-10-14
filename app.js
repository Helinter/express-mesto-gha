const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://127.0.0.1:27017/mestodb';

app.use(helmet());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '652831e11a35f9d24cf8b8f0',
  };

  next();
});

const userRouter = require('./routes/users');

app.use(userRouter);

const cardRouter = require('./routes/cards');

app.use(cardRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
