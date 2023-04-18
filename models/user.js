const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя пользователя не передано'],
    minlength: [2, 'Минимальная длина поля имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длинна поля имени пользователя 30 символов'],
  },
  about: {
    type: String,
    required: [true, 'Описание пользователя не передано'],
    minlength: [2, 'Минимальная длина поля описания пользователя 2 символа'],
    maxlength: [30, 'Максимальная длинна поля описания пользователя 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Ссылка на аватар не передана'],
  },
});

module.exports = mongoose.model('user', userSchema);
