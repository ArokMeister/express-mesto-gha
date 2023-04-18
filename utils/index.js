const mongooseError = require('mongoose').Error;
const {
  BAD_REQUEST_400, SERVER_ERROR_500, NOT_FOUND_404,
} = require('../constants/constants');

const handleError = (res, err, defMessage = 'Ошибка') => {
  const textError = { message: `${defMessage}: ${err.message}` };
  if (err instanceof mongooseError.ValidationError) {
    const resError = { message: `${defMessage}: ${Object.values(err.errors).map((error) => error.message).join(' ')}` };
    res.status(BAD_REQUEST_400).send(resError);
    return;
  }
  if (err instanceof mongooseError.CastError) {
    res.status(NOT_FOUND_404).send(textError);
    return;
  }
  if (err instanceof Error) {
    res.status(err.statusCode).send(textError);
  } else {
    res.status(SERVER_ERROR_500).send(textError);
  }
};

module.exports = { handleError };
