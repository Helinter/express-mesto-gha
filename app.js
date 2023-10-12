const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/mestodb';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '652831e11a35f9d24cf8b8f0',
  };

  next();
});

const userController = require('./controllers/userController');

app.get('/users', userController.getAllUsers);
app.get('/users/:userId', userController.getUserById);
app.post('/users', userController.createUser);
app.patch('/users/me', userController.updateProfile);
app.patch('/users/me/avatar', userController.updateAvatar);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
