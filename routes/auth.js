const authRouter = require('express').Router()
const { celebrate, Joi } = require('celebrate')
const { createUser, login } = require('../controllers/users')
const { regex } = require('../constants/constants')

authRouter.post(
  '/signup',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
      name: Joi.string().min(3).max(30),
      about: Joi.string().min(5).max(30),
      avatar: Joi.string().regex(regex.link),
    },
  }),
  createUser,
)
authRouter.post(
  '/signin',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    },
  }),
  login,
)

module.exports = {
  authRouter,
}
