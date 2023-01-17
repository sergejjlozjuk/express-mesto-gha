const errorHandler = (err, req, res, next) => {
  if (
    err instanceof NotFoundError
    || err instanceof ValidationError
    || err instanceof AuthenticationError
    || err instanceof MongoServerError
    || err instanceof ForbiddenError
    || err.error === 'Bad Request'
  ) {
    res.status(err.statusCode).send({ message: err.message })
  } else {
    res.status(500).send({ message: 'Ошибка на сервере' })
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Not Found'
    this.statusCode = 404
  }
}
class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Validation Error'
    this.statusCode = 400
  }
}
class AuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Authentication Error'
    this.statusCode = 401
  }
}
class MongoServerError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MongoServer Error'
    this.statusCode = 409
  }
}
class ForbiddenError extends Error {
  constructor(message) {
    super(message)
    this.name = 'Forbidden Error'
    this.statusCode = 403
  }
}
module.exports = {
  NotFoundError,
  ValidationError,
  AuthenticationError,
  MongoServerError,
  ForbiddenError,
  errorHandler,
}
