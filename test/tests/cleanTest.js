const clean = require('../../service/clean')
const constants = require('../../res/constants')
require('should')

describe('Delete all persons and relationships', () => {
  it('Should delete all', async () => {
    const response = await clean.deleteAll()
    response.should.be.eql(constants.deleteCompleted)
  })
})
