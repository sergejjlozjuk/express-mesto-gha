const { isCelebrateError } = require('celebrate')

const errorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    err.details.forEach((detail) => message = detail.message)
    res.status(400).send({ message })
  } else if (
    err instanceof NotFoundError ||
    ValidationError ||
    AuthenticationError ||
    err.error === 'Bad Request'
  ) {
    res.status(err.statusCode).send({ message: err.message })
  } else if (err.name === 'MongoServerError') {
    res
      .status(409)
      .send({ message: 'Пользователь с таким Логином уже существует.' })
  } else if (err.name === 'MongoServerError') {
    res.status(400).send({message: 'Пользователь с таким Логином уже существует.'})
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' })
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super()
    this.message = message
    ;(this.name = 'Not Found'), (this.statusCode = 404)
  }
}
class ValidationError extends Error {
  constructor(message) {
    super()
    this.message = message
    ;(this.name = 'Validation Error'), (this.statusCode = 400)
  }
}
class AuthenticationError extends Error {
  constructor(message) {
    super()
    this.message = message
    ;(this.name = 'Authentication Error'), (this.statusCode = 401)
  }
}

module.exports = {
  NotFoundError,
  ValidationError,
  AuthenticationError,
  errorHandler,
}
