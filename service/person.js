const utils = require('../utils/response')
const errors = require('../res/errorMessage')
const constants = require('../res/constants')

const persons = []

const check = () => {
  return utils.msg(`Atualmente existem ${persons.length} amigos cadastrados.`)
}

const getByCpf = (req) => {
  const { cpf } = { cpf: req }
  if (cpf.length != 11) return errors.invalidCpf
  const person = persons.find((person) => person.cpf === cpf)
  return person ? (utils.msg(person)) : errors.cpfNotFound
  // return person ? res.status(200).send(utils.msg(person)) : res.status(errors.cpfNotFound.httpCode).send(errors.cpfNotFound)
}

const postNewPerson = (req) => {
  const newPerson = req.body
  if (newPerson.cpf.length != 11) return errors.invalidCpf
  if (persons.some(e => e.cpf === newPerson.cpf)) {
    return errors.cpfAlreadyExist
  } else {
    persons.push(newPerson)
    return utils.msg(constants.createCompleted)
  }
}

const deletePerson = () => {
  while (persons.length > 0) {
    persons.pop();
  }
  return utils.msg(constants.deleteCompleted)
}

module.exports = {
  check,
  getByCpf,
  postNewPerson,
  deletePerson
}