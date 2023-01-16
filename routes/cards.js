const { celebrate, Joi } = require('celebrate')
const {
  getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike,
} = require('../controllers/cards')

const cardsRouter = require('express').Router()

cardsRouter.get('/cards', getCards)
cardsRouter.delete(
  '/cards/:cardId',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .regex(/[0-9a-zA-Z]{24}/),
    },
  }),
  deleteCard,
)
cardsRouter.post(
  '/cards',
  celebrate({
    body: {
      name: Joi.string().required().min(3),
      link: Joi.string()
        .required()
        .regex(/https*\:\/\/[a-z\.\_\@\!\?\&\-\=\$\~\#'()\*\:\[\]\/0-9\+,;]*/),
    },
  }),
  createCard,
)
cardsRouter.put(
  '/cards/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .regex(/[0-9a-zA-Z]{24}/),
    },
  }),
  setLike,
)
cardsRouter.delete(
  '/cards/:cardId/likes',
  celebrate({
    params: {
      cardId: Joi.string()
        .required()
        .regex(/[0-9a-zA-Z]{24}/),
    },
  }),
  deleteLike,
)

module.exports = { cardsRouter }
