const clean = require('../../service/clean')
const constants = require('../../res/constants')
require('should')

describe('Delete all persons and relationships', () => {
  it('Should delete all', () => {
    clean.deleteAll().Response.should.be.equal(constants.deleteCompleted)
  })
})
