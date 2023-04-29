const { celebrate, Joi } = require('celebrate');
const { patternLink } = require('../../constants/constants');

const cardDataValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(patternLink).required(),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  cardDataValidation,
  cardIdValidation,
};
