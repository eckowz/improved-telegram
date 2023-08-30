const genericError = require('../res/errorMessage')
const errorHandler = (err, req, res, next) => {
  if (err.httpCode) {
    return res.status(err.httpCode).json(err)
  } else {
    return res.status(genericError.internalServerError.httpCode).json(genericError.internalServerError)
  }
}

module.exports = errorHandler