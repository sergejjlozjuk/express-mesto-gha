const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserProfile,
} = require('../controllers/users')

const usersRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')

usersRouter.get('/users', getUsers)
usersRouter.get('/users/me', getUserProfile)
usersRouter.get('/users/:userId', celebrate({
  params: {
    userId: Joi.string().required().regex(/[0-9a-zA-Z]{24}/)
  }
}), getUserById)
usersRouter.patch('/users/me', celebrate({
  body: {
    name: Joi.string().max(30),
    about: Joi.string().max(200),
  }
}), updateProfile)
usersRouter.patch('/users/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required().regex(/https*\:\/\/[a-z\.\_\@\!\?\&\-\=\$\~\#'()\*\:\[\]\/0-9\+,;]*/)
  }
}), updateAvatar)

module.exports = { usersRouter }
