const User = require('../models/user');
const { handleError } = require('../utils');
const { CREATED_201, NOT_FOUND_404 } = require('../constants/constants');

function getAllUsers(_, res) {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => handleError(res, err));
}

async function getUser(req, res) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(NOT_FOUND_404).send({ message: 'Пользователя с данным id не найдено' });
      return;
    }
    res.send(user);
  } catch (err) {
    handleError(res, err);
  }
}

async function createUser(req, res) {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });

    res.status(CREATED_201).send({ user });
  } catch (err) {
    handleError(res, err);
  }
}

async function updatePartUserInfo(req, res, userData) {
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      userData,
      { new: true, runValidators: true },
    );
    res.send(user);
  } catch (err) {
    handleError(res, err);
  }
}

function updateUser(req, res) {
  const { name, about } = req.body;
  updatePartUserInfo(req, res, { name, about });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  updatePartUserInfo(req, res, { avatar });
}

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  updateAvatar,
};
