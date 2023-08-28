const express = require("express")
const router = express.Router()
const relationshipService = require('../service/relationship')

router.get('/check', (req, res, next) => {
  relationshipService.check()
    .then(response => next(res.json(response)))
    .catch(err => next(res.status(err.httpCode).json(err)))
})

router.post('/', (req, res, next) => {
  relationshipService.createRelationship(req.body)
    .then(response => next(res.json(response)))
    .catch(err => next(res.status(err.httpCode).json(err)))
})

module.exports = router