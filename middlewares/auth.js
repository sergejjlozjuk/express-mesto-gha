const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('../error/error')

const { JWT_SECRET } = process.env
const auth = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    next(new AuthenticationError('Требуется авторизация'))
  }
  if (token) {
    let payload
    try {
      payload = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      next(new AuthenticationError('Требуется авторизация'))
    }
    req.user = payload
    next()
  }
}
module.exports = {
  auth,
}
