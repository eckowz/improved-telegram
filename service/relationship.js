const person = require('./person')
const constants = require('../res/constants')
const errors = require('../res/errorMessage')

const relationships = []

const check = async () => {
  return `Atualmente existem ${relationships.length} relacionamentos cadastrados.`
}

const getRelationshipByCpf = async (req) => {
  const response = relationships.filter((relationship) => relationship.cpf1.includes(req) || relationship.cpf2.includes(req))
  return response
}

const postNewRelationship = (req) => {
  const newRelationship = req
  relationships.push(newRelationship)
}

const deleteRelationship = async () => {
  while (relationships.length > 0) {
    relationships.pop();
  }
  return constants.deleteCompleted
}

const createRelationship = async (req) => {
  const checkCpf1 = await person.getByCpf(req.cpf1)
  const checkCpf2 = await person.getByCpf(req.cpf2)
  if (checkCpf1 && checkCpf2) {
    postNewRelationship(req)
    return constants.relationshipCreated
  }
}

module.exports = {
  postNewRelationship,
  createRelationship,
  check,
  getRelationshipByCpf,
  deleteRelationship
}