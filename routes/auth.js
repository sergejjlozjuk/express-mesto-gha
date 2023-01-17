const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/users');

authRouter.post(
  '/signup',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
      name: Joi.string().min(3),
      about: Joi.string().min(5),
      avatar: Joi.string().regex(/https*:\/\/[a-z._@!?&\-=$~#'()*:[\]/0-9+,;]*/),
    },
  }),
  createUser,
);
authRouter.post(
  '/signin',
  celebrate({
    body: {
      email: Joi.string().required().email(),
      password: Joi.string().required().min(3),
    },
  }),
  login,
);

module.exports = {
  authRouter,
};
