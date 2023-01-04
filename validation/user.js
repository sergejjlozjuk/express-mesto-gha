const Joi = require('joi')

const validationId = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    // userId: Joi.ObjecId(true).reqired(),
  })
  return schema.validate(data)
}

module.exports = {
  validationId,
}
