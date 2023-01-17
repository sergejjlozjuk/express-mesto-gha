const User = require('../models/user');
const bcrypt = require('bcrypt');

const { JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const {
  NotFoundError,
  AuthenticationError,
  MongoServerError,
} = require('../error/error');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};
const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Такого пользователя не существует'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const { name, about, avatar, _id, email } = user;
      res.status(201).send({ name, about, avatar, _id, email });
    })
    .catch((err) => {
      if (err.name === 'MongoServerError') {
        next(new MongoServerError('Пользователь с такой почтой уже существует'))
      }
    });
};
const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;
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
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Такого пользователя не существует');
      }
    })
    .catch(next);
};
const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
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
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Такого пользователя не существует');
      }
    })
    .catch(next);
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new AuthenticationError('Неправильные почта или пароль'),
        );
      } if (user) {
        return { matched: bcrypt.compare(password, user.password), user };
      }
    })
    .then(({ matched, user }) => {
      if (!matched) {
        return Promise.reject(
          new AuthenticationError('Неправильные почта или пароль'),
        );
      } if (matched) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: '7d',
        });
        res.cookie('token', token, {
          httpOnly: true,
        });
        res.send('Аутентификация прошла успешно');
      }
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getUserProfile,
};
