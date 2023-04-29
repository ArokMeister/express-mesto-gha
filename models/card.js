const mongoose = require('mongoose');
const { patternLink } = require('../constants/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя карточки не передано'],
    minlength: [2, 'Минимальная длина имени карточки 2 символа'],
    maxlength: [30, 'Максимальная длина имени карточки 30 символа'],
  },
  link: {
    type: String,
    required: [true, 'Ссылка на карточку не передана'],
    validate: {
      validator(values) {
        return patternLink.test(values);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Создатель карточки не передан'],
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
