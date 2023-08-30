const express = require("express")
const router = express.Router()
const relationshipService = require('../service/relationship')

router.get('/check', (req, res, next) => {
  relationshipService.check()
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  relationshipService.createRelationship(req.body)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router