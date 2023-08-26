const utils = require('../utils/response')
const constants = require('../res/constants')
const person = require('./person')
const relationship = require('./relationship')

const deleteAll = () => {
  person.deletePerson()
  relationship.deleteRelationship()
  return utils.msg(constants.deleteCompleted)
}

module.exports = {
  deleteAll
}