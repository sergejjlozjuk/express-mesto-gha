const e = require('express')
const { NotFoundError, ValidationError } = require('../error/error')
const card = require('../models/card')

const createCard = (req, res) => {
  const owner = req.user._id
  const { name, link } = req.body
  card
    .create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}

const getCards = (req, res) => {
  card
    .find({})
    .then((cards) => {
      res.send(cards)
    })
    .catch((err) => res.status(500).send({ message: 'Ошибка на сервере' }))
}
const deleteCard = (req, res) => {
  card
    .findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send(card)
      } else {
        throw new NotFoundError('Такой карточки не сущетвует')
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message })
      } else if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}
const setLike = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (card) {
        res.status(200).send(card)
      } else {
        throw new NotFoundError('Такой карточки не существует')
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message })
      } else if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}
const deleteLike = (req, res) => {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (card) {
        res.status(200).send(card)
      } else {
        throw new NotFoundError('Такой карточки не существует')
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err.message })
      } else if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}

module.exports = { createCard, getCards, deleteCard, setLike, deleteLike }
