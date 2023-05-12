const jwt = require('jsonwebtoken');

const { SECRET_KEY, NODE_ENV } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret-key', { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return false;
  }
}

module.exports = { generateToken, checkToken };
