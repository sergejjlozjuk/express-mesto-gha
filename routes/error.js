const { NotFoundError } = require("../error/error")

const notFoundPage = (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует!'))
}
module.exports ={
  notFoundPage
}