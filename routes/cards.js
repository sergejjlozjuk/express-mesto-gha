const { celebrate, Joi } = require('celebrate');
const { regex } = require('../constants/constants');
const {
  getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike,
} = require('../controllers/cards');

const cardsRouter = require('express').Router();

cardsRouter.get('/', getCards);
cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .regex(regex.id),
    },
  }),
  deleteCard,
);
cardsRouter.post(
  '/',
  celebrate({
    body: {
      name: Joi.string().required().min(3),
      link: Joi.string()
        .required()
        .regex(regex.link),
    },
  }),
  createCard,
);
cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .regex(regex.id),
    },
  }),
  setLike,
);
cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .regex(regex.id),
    },
  }),
  deleteLike,
);

module.exports = { cardsRouter };
