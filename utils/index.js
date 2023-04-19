const mongooseError = require('mongoose').Error;
const {
  BAD_REQUEST_400, SERVER_ERROR_500,
} = require('../constants/constants');

const handleError = (res, err, defMessage = 'Ошибка:') => {
  if (err instanceof mongooseError.ValidationError) {
    const resError = { message: `${defMessage} ${Object.values(err.errors).map((error) => error.message).join(' ')}` };
    res.status(BAD_REQUEST_400).send(resError);
    return;
  }
  if (err instanceof mongooseError.CastError) {
    res.status(BAD_REQUEST_400).send({ message: `${defMessage} Ошибка в передаваеммых данных или типе запроса` });
    return;
  }
  res.status(SERVER_ERROR_500).send({ message: `${defMessage} Произошла ошибка на сервере` });
};

module.exports = { handleError };
