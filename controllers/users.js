const User = require('../models/user')
const { NotFoundError, ValidationError } = require('../error/error')
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send({ message: err.message }))
}
const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
      }
       else if (err.name === 'CastError') {
        res.status(400).send({ message: err.message })
      }
      else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}
const createUser = (req, res) => {
  const { name, about, avatar } = req.body
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}
const updateProfile = (req, res) => {
  const { name, about } = req.body
  const id = req.user._id
  User.findByIdAndUpdate(
    id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user)
      } else {
        throw new NotFoundError('Такого пользователя не существует')
      }
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}
const updateAvatar = (req, res) => {
  const id = req.user._id
  const { avatar } = req.body
  User.findByIdAndUpdate(
    id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.status(200).send(user)
      } else {
        throw new NotFoundError('Такого пользователя не существует')
      }
    })
    .catch((err) => {
      if (err instanceof NotFoundError) {
        res.status(err.statusCode).send({ message: err.message })
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message })
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' })
      }
    })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
}
