const jwt = require('jsonwebtoken')
const { JWT_SECRET } = process.env
const auth = (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).send('Требуется авторизация')
  } else if (authorization) {
    const token = authorization.replace('Bearer ', '')
    let payload
    try {
      payload = jwt.verify(token, JWT_SECRET)
    } catch (err) {
      res.status(401).send('Необходима авторизация')
    }
    req.user = payload
    next()
  }
}
module.exports = {
  auth,
}
