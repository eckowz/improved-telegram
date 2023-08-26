const express = require('express')
const router = express.Router()
const personService = require('../service/person')

router.get('/check', (req, res) => {
  res.send(personService.check())
})

router.get('/:CPF', (req, res) => {
  res.send(personService.getByCpf(req.params.CPF))
})

router.post('/', (req, res) => {
  res.send(personService.postNewPerson(req))
})

module.exports = router