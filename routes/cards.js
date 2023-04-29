const cardRouter = require('express').Router();
const {
  getAllCards, deleteCard, createCard, setLike, deleteLike,
} = require('../controllers/cards');
const { cardDataValidation, cardIdValidation } = require('../utils/validations/cardsJoi');

cardRouter.get('/', getAllCards);
cardRouter.post('/', cardDataValidation, createCard);
cardRouter.delete('/:id', cardIdValidation, deleteCard);
cardRouter.put('/:id/likes', cardIdValidation, setLike);
cardRouter.delete('/:id/likes', cardIdValidation, deleteLike);

module.exports = cardRouter;
