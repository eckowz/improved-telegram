const errors = require('../res/errorMessage')
const constants = require('../res/constants')

const persons = []

const check = async () => {
  const response = `Atualmente existem ${persons.length} amigos cadastrados.`
  return response
}

const getByCpf = async (req) => {
  const { cpf } = { cpf: req }
  if (cpf.length != 11) throw errors.invalidCpf
  const person = persons.find((person) => person.cpf === cpf)
  if (!person) throw errors.cpfNotFound
  return person
}

const postNewPerson = async (req) => {
  const newPerson = req.body
  if (newPerson.cpf.length != 11) throw errors.invalidCpf
  if (persons.some(e => e.cpf === newPerson.cpf)) {
    throw errors.cpfAlreadyExist
  } else {
    persons.push(newPerson)
    return constants.createCompleted
  }
}

const deletePerson = async () => {
  while (persons.length > 0) {
    persons.pop();
  }
  return constants.deleteCompleted
}

module.exports = {
  check,
  getByCpf,
  postNewPerson,
  deletePerson
}