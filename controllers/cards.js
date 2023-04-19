const Card = require('../models/card');
const { handleError } = require('../utils/index');
const { CREATED_201, NOT_FOUND_404 } = require('../constants/constants');

const getAllCards = async (_, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    handleError(res, err);
  }
};

const deleteCard = async (req, res) => {
  const { id } = req.params;

  try {
    const card = await Card.findByIdAndRemove(id);
    if (!card) {
      res.status(NOT_FOUND_404).send({ message: 'Карточки с таким id не существует' });
      return;
    }
    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    const makeCard = await Card.create({ name, link, owner: _id });
    const card = await makeCard.populate('owner');
    res.status(CREATED_201).send(card);
  } catch (err) {
    handleError(res, err);
  }
};

const likeSwitch = async (req, res) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      req.method === 'PUT' ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      res.status(NOT_FOUND_404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send(card);
  } catch (err) {
    handleError(res, err);
  }
};

const setLike = (req, res) => {
  likeSwitch(req, res);
};

const deleteLike = (req, res) => {
  likeSwitch(req, res);
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike,
};
