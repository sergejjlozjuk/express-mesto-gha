const {
  getCards,
  deleteCard,
  createCard,
  setLike,
  deleteLike,
} = require('../controllers/cards')

const cardsRouter = require('express').Router()

cardsRouter.get('/cards', getCards)
cardsRouter.delete('/cards/:cardId', deleteCard)
cardsRouter.post('/cards', createCard)
cardsRouter.put('/cards/:cardId/likes', setLike)
cardsRouter.delete('/cards/:cardId/likes', deleteLike)

module.exports = { cardsRouter }
