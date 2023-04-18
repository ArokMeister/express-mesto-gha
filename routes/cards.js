const cardRouter = require('express').Router();
const {
  getAllCards, deleteCard, createCard, setLike, deleteLike,
} = require('../controllers/cards');

cardRouter.get('/cards', getAllCards);
cardRouter.post('/cards', createCard);
cardRouter.delete('/cards/:id', deleteCard);
cardRouter.put('/cards/:id/likes', setLike);
cardRouter.delete('/cards/:id/likes', deleteLike);

module.exports = cardRouter;
