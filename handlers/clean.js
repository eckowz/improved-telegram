const express = require('express')
const router = express.Router()
const cleanService = require('../service/clean')

router.delete('/', (req, res, next) => {
  cleanService.deleteAll(req)
    .then(response => res.json(response))
    .catch(err => next(res.status(err.httpCode).json(err)))
})

module.exports = router