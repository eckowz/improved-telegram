const constants = require('../res/constants')
const person = require('./person')
const relationship = require('./relationship')

const deleteAll = async () => {
  await person.deletePerson()
  await relationship.deleteRelationship()
  return constants.deleteCompleted
}

module.exports = {
  deleteAll
}