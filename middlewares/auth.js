const UnauthorizedError = require('../utils/customError/UnauthorizedError');
const { checkToken } = require('../utils/token');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const validateToken = checkToken(token);
  if (!validateToken) {
    throw new UnauthorizedError('Доступ запрещен. Необходима авторизация');
  }
  req.user = validateToken;
  next();
};

module.exports = {
  auth,
};
