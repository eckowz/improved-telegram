// wiki.js - Wiki route module

const express = require("express")
const router = express.Router()
const errors = require('../res/errorMessage')

const persons = []

router.get('/check', (req, res) => {
  res.send(`Atualmente existem ${persons.length} amigos cadastrados.`)
});

router.get('/:CPF', (req, res) => {
  const { CPF } = req.params
  console.log(req.query)
  console.log(CPF)
  const person = persons.find( (person) => person.cpf === CPF)
  person ? res.status(200).send(person) : res.status(errors.cpfNotFound.httpCode).send(errors.cpfNotFound)
});

router.post('/', (req, res) => {
  const newPerson = req.body
  if (newPerson.cpf.length != 11) res.status(errors.invalidCpf.httpCode).send(errors.invalidCpf)
  persons.some(e => e.cpf === newPerson.cpf) ? res.status(errors.cpfAlreadyExist.httpCode).send(errors.cpfAlreadyExist) : persons.push(newPerson)
  res.status(200).send('Cadastro Realizado!')
});

module.exports = router