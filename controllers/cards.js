const { NotFoundError, ValidationError } = require('../error/error')
const card = require('../models/card')

const createCard = (req, res) => {
  const owner = req.user._id
  const { name, link } = req.body
  card
    .create({ name, link, owner })
    .then((card) => {
      if (card) {
        res.status(201).send(card)
        return
      }
      throw new ValidationError('Данные для создания введены не корректно')
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        res.status(err.statusCode).send({ message: err.message })
        return
      }
      res.status(500).send({ message: 'Ошибка на сервере' })
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
        res.status(200).send(`Удалена карточка: ${card}`)
        return
      }
      throw new NotFoundError('Такой карточки не существует')
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
        return
      }
      res.status(500).send({ message: 'Ошибка на сервере' })
    })
}
const setLike = (req, res) => {
  const id = req.user._id
  card
    .findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (card) {
        res.status(200).send(card)
        return
      }
      throw new NotFoundError('Такой карточки не существует')
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message })
        return
      }
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
        return
      }
      res.status(500).send({ message: 'Ошибка на сервере' })
    })
}
const deleteLike = (req, res) => {
  const id = req.user._id
  card
    .findByIdAndUpdate(id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.status(200).send(card)
        return
      }
      throw new NotFoundError('Такой карточки не существует')
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message })
        return
      }
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
        return
      }
      res.status(500).send({ message: 'Ошибка на сервере' })
    })
}

module.exports = { createCard, getCards, deleteCard, setLike, deleteLike }
