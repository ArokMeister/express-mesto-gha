const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { NOT_FOUND_404 } = require('./constants/constants');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '643ebc1451d1931b0bf0e7e0',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (_, res) => { res.status(NOT_FOUND_404).send({ message: 'Страница не найдена' }); });

app.listen(PORT, () => {});
