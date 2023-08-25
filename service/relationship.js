const person = require('./person')
const utils = require('../utils/response')

const relationships = []

const postNewRelationship = (req) => {
  const newRelationship = req
  console.log(newRelationship)
  relationships.push(newRelationship)
  console.log(relationships)
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
  createRelationship
}