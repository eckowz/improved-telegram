const express = require('express')
const router = express.Router()
const cleanService = require('../service/clean')

router.delete('/', (req, res) => {
  res.send(cleanService.deleteAll(req))
})

module.exports = router