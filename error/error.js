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

module.exports = {
  NotFoundError,
  ValidationError,
}
