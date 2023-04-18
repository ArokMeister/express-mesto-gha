const mongooseError = require('mongoose').Error;
const {
  BAD_REQUEST_400, SERVER_ERROR_500,
} = require('../constants/constants');

const handleError = (res, err, defMessage = 'Ошибка') => {
  const resError = { message: `${defMessage}: ${err.errors.name.message}` };
  if (err instanceof mongooseError.CastError || err instanceof mongooseError.ValidationError) {
    res.status(BAD_REQUEST_400).send(resError);
    return;
  }
  if (err instanceof Error) {
    res.status(err.statusCode).send(resError);
  } else {
    res.status(SERVER_ERROR_500).send(resError);
  }
};

module.exports = { handleError };
