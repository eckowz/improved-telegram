// wiki.js - Wiki route module

const express = require('express')
const router = express.Router()
const errors = require('../res/errorMessage')
const utils = require('../utils/response')
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

router.delete('', (req, res) => {
  res.send(personService.deletePerson(req))
})

module.exports = router