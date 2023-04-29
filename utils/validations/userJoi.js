const { celebrate, Joi } = require('celebrate');
const { patternLink } = require('../../constants/constants');

const userDataValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(patternLink),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(patternLink),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  userDataValidation,
  userInfoValidation,
  userAvatarValidation,
  userIdValidation,
};
