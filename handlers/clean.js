const express = require('express')
const router = express.Router()
const cleanService = require('../service/clean')

router.delete('/', (req, res, next) => {
  cleanService.deleteAll(req)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router