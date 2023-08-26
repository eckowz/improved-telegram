const person = require('./person')
const utils = require('../utils/response')

const relationships = [
  { cpf1: '01234567890', cpf2: '09876543210'},//joao - maria
  { cpf1: '01234567890', cpf2: '45678912300'},//joao - eduardo
  { cpf1: '09876543210', cpf2: '98765465445'},//maria - monica
  { cpf1: '45678912300', cpf2: '98765465445'},//eduardo - monica
  { cpf1: '45678912300', cpf2: '85205468428'},//eduardo - felipe
  
]

const check = () => {
  return utils.msg(`Atualmente existem ${relationships.length} relacionamentos cadastrados.`)
}

const getRelationshipByCpf = (req) => {
  const response = relationships.filter((relationship) => relationship.cpf1.includes(req) || relationship.cpf2.includes(req))
  return response
}

const postNewRelationship = (req) => {
  const newRelationship = req
  relationships.push(newRelationship)
}

const deleteRelationship = () => {
  while (relationships.length > 0) {
    relationships.pop();
  }
  return utils.msg(`Cadastros excluídos.`)
}

const createRelationship = (req) => {
  const checkCpf1 = person.getByCpf(req.cpf1)
  const checkCpf2 = person.getByCpf(req.cpf2)
  if (checkCpf1.Response && checkCpf2.Response) {
    postNewRelationship(req)
    return utils.msg('Relacionamento criado.')
  } else {
    return {
      cpf1: checkCpf1,
      cpf2: checkCpf2,
    }
  }
}

module.exports = {
  createRelationship,
  check,
  getRelationshipByCpf,
  deleteRelationship
}