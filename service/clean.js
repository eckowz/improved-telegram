const utils = require('../utils/response')
const person = require('./person')
const relationship = require('./relationship')

const deleteAll = () => {
  person.deletePerson()
  relationship.deleteRelationship()
  return utils.msg('Cadastros excluidos.')
}

module.exports = {
  deleteAll
}