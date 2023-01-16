const e = require('express')
const {
  NotFoundError,
  ValidationError,
  AuthenticationError,
} = require('../error/error')
const card = require('../models/card')

const createCard = (req, res, next) => {
  const owner = req.user._id
  const { name, link } = req.body
  card
    .create({ name, link, owner })
    .populate(['owner', 'likes'])
    .then((card) => res.status(201).send(card))
    .catch(next)
}

const getCards = (req, res, next) => {
  card
    .find({})
    .populate(['owner', 'likes'])
    .then((cards) => {
      res.send(cards)
    })
    .catch(next)
}
const deleteCard = (req, res, next) => {
  card
    .findById(req.params.cardId)
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Такой карточки не сущетвует'))
    .then((cardItem) => {
      if (cardItem.owner._id.toString() !== req.user._id) {
        return Promise.reject(new AuthenticationError('Недостаточно прав'))
      } else if (cardItem.owner._id.toString() === req.user._id) {
        return card.findByIdAndDelete(req.params.cardId)
      }
    })
    .then((card) => res.status(200).send(card))
    .catch(next)
}
const setLike = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.status(200).send(card)
      } else {
        throw new NotFoundError('Такой карточки не существует')
      }
    })
    .catch(next)
}
const deleteLike = (req, res, next) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .then((card) => {
      if (card) {
        res.status(200).send(card)
      } else {
        throw new NotFoundError('Такой карточки не существует')
      }
    })
    .catch(next)
}

module.exports = { createCard, getCards, deleteCard, setLike, deleteLike }
