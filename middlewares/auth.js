const { checkToken } = require('../utils/token');
const { UNAUTHORIZED_401 } = require('../constants/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const validateToken = checkToken(token);
  if (!validateToken) {
    res.status(UNAUTHORIZED_401).send({ error: 'Доступ запрещен. Необходима авторизация' });
    return;
  }
  req.user = validateToken;
  next();
};

module.exports = {
  auth,
};
