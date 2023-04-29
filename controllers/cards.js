const Card = require('../models/card');
const {
  CREATED_201,
} = require('../constants/constants');
const NotFoundError = require('../utils/customError/NotFoundError');
const ForbiddenError = require('../utils/customError/ForbiddenError');

const getAllCards = async (_, res, next) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const deleteCard = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const card = await Card.findById(id);
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    const ownerId = card.owner._id.toString();
    if (userId !== ownerId) {
      throw new ForbiddenError('Нельзя удалять чужие карточки');
    }
    await Card.findByIdAndRemove(id);
    res.send({ message: 'Карточка удалена' });
  } catch (err) {
    next(err);
  }
};

const createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    const makeCard = await Card.create({ name, link, owner: _id });
    const card = await makeCard.populate('owner');
    res.status(CREATED_201).send(card);
  } catch (err) {
    next(err);
  }
};

const likeSwitch = async (req, res, next) => {
  const { id: cardId } = req.params;
  const { _id: userId } = req.user;

  try {
    const card = await Card.findByIdAndUpdate(
      cardId,
      req.method === 'PUT' ? { $addToSet: { likes: userId } } : { $pull: { likes: userId } },
      { new: true },
    );
    if (!card) {
      throw new NotFoundError('Карточка не найдена');
    }
    res.send(card);
  } catch (err) {
    next(err);
  }
};

const setLike = (req, res, next) => {
  likeSwitch(req, res, next);
};

const deleteLike = (req, res, next) => {
  likeSwitch(req, res, next);
};

module.exports = {
  getAllCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike,
};
