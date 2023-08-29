const express = require('express')
const router = express.Router()
const personService = require('../service/person')

router.get('/check', (req, res, next) => {
  personService.check()
    .then(response => res.json(response))
    .catch(err => next(res.status(err.httpCode).json(err)))
})

router.get('/:CPF', (req, res, next) => {
  personService.getByCpf(req.params.CPF)
    .then(response => res.json(response))
    .catch(err => next(res.status(err.httpCode).json(err)))
})

router.post('/', (req, res, next) => {
  personService.postNewPerson(req)
    .then(response => res.json(response))
    .catch(err => next(res.status(err.httpCode).json(err)))
})

module.exports = router