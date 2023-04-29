const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../utils/customError/UnauthorizedError');
const { patternLink } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длинна поля имени пользователя 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля описания пользователя 2 символа'],
    maxlength: [30, 'Максимальная длинна поля описания пользователя 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(values) {
        return patternLink.test(values);
      },
    },
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Неверный формат почты',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { toJSON: { useProjection: true }, toObject: { useProjection: true } });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильная почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
