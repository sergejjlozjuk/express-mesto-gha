const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserProfile,
} = require('../controllers/users');

const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regex } = require('../constants/constants');

usersRouter.get('/', getUsers);
usersRouter.get('/me', getUserProfile);
usersRouter.get('/:userId', celebrate({
  params: {
    userId: Joi.string().required().regex(regex.id),
  },
}), getUserById);
usersRouter.patch('/users/me', celebrate({
  body: {
    name: Joi.string().required().max(30),
    about: Joi.string().required().max(200),
  },
}), updateProfile);
usersRouter.patch('/users/me/avatar', celebrate({
  body: {
    avatar: Joi.string().required().regex(regex.link),
  },
}), updateAvatar);

module.exports = { usersRouter };
