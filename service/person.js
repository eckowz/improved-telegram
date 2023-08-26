const utils = require('../utils/response')
const errors = require('../res/errorMessage')

const persons = [
  { name: 'joao', cpf: '01234567890' },
  { name: 'maria', cpf: '09876543210' },
  { name: 'eduardo', cpf: '45678912300' },
  { name: 'monica', cpf: '98765465445' },
  { name: 'felipe', cpf: '85205468428' }
]

const check = () => {
  return utils.msg(`Atualmente existem ${persons.length} amigos cadastrados.`)
}

const getByCpf = (req) => {
  const { cpf } = { cpf: req }
  const person = persons.find((person) => person.cpf === cpf)
  return person ? (utils.msg(person)) : (errors.cpfNotFound)
  // return person ? res.status(200).send(utils.msg(person)) : res.status(errors.cpfNotFound.httpCode).send(errors.cpfNotFound)
}

const postNewPerson = (req) => {
  const newPerson = req.body
  if (newPerson.cpf.length != 11) return utils.msg(errors.invalidCpf)
  if (persons.some(e => e.cpf === newPerson.cpf)) {
    return utils.msg(errors.cpfAlreadyExist)
  } else {
    persons.push(newPerson)
    return utils.msg('Cadastro Realizado!')
  }
}

const deletePerson = () => {
  while (persons.length > 0) {
    persons.pop();
  }
  return utils.msg(`Cadastros excluídos.`)
}

module.exports = {
  check,
  getByCpf,
  postNewPerson,
  deletePerson
}