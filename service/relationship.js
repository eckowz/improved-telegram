const person = require('./person')
const utils = require('../utils/response')
const constants = require('../res/constants')

const relationships = []

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
  return utils.msg(constants.deleteCompleted)
}

const createRelationship = (req) => {
  const checkCpf1 = person.getByCpf(req.cpf1)
  const checkCpf2 = person.getByCpf(req.cpf2)
  if (checkCpf1.Response && checkCpf2.Response) {
    postNewRelationship(req)
    return utils.msg(constants.relationshipCreated)
  } else {
    return {
      cpf1: checkCpf1,
      cpf2: checkCpf2,
    }
  }
}

module.exports = {
  postNewRelationship,
  createRelationship,
  check,
  getRelationshipByCpf,
  deleteRelationship
}