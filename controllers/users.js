const bcrypt = require('bcryptjs');
const User = require('../models/user');
const UnauthorizedError = require('../utils/customError/UnauthorizedError');
const { CREATED_201 } = require('../constants/constants');
const { generateToken } = require('../utils/token');
const NotFoundError = require('../utils/customError/NotFoundError');

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    }
    const payload = { _id: user._id };
    const token = generateToken(payload);
    res
      .cookie('jwt', token, { maxAge: (3600000 * 24 * 7), httpOnly: true })
      .send({ message: 'Авторизация прошла успешно' });
  } catch (err) {
    next(err);
  }
}

async function getAllUsers(_, res, next) {
  const users = await User.find({});
  try {
    res.send({ users });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError('Пользователя с данным id не найдено');
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new UnauthorizedError('С токеном что-то не так');
    }
    res.send({ user });
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, about, avatar, email, password: hash,
    });

    res.status(CREATED_201).send({ user });
  } catch (err) {
    next(err);
  }
}

async function updatePartUserInfo(req, res, userData, next) {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      userData,
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
}

function updateUser(req, res, next) {
  const { name, about } = req.body;
  updatePartUserInfo(req, res, { name, about }, next);
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;
  updatePartUserInfo(req, res, { avatar }, next);
}

module.exports = {
  login,
  getMe,
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
};
