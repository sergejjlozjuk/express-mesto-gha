const { auth } = require('../middlewares/auth');
const { authRouter } = require('./auth');
const { cardsRouter } = require('./cards');
const { notFoundPage } = require('./error');
const { usersRouter } = require('./users');

const Router = require('express').Router();

Router.use('/', authRouter);
Router.use(auth);
Router.use('/users', usersRouter);
Router.use('/cards', cardsRouter);
Router.use('*', notFoundPage);
module.exports = {
  Router,
};
