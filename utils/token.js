const jwt = require('jsonwebtoken');

const { SECRET_KEY = '9e48ab7d7e595006f02c5f10750ecbc4f76ce2b13be43641500a746e6dbdbf21' } = process.env;

function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
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
