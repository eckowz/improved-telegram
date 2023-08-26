const person = require('../../service/person')
const relationship = require('../../service/relationship')
const clean = require('../../service/clean')
const recommendations = require('../../service/recommendations')
const constants = require('../../res/constants')
const errors = require('../../res/errorMessage')
require('should')

describe('Recommendations tests', () => {
  beforeEach(() => {
    clearMock()
    mockPerson()
    mockRelationships()
  })
  it('Should not get recommendations for invalid CPF', () => {
    const getRecommendations = recommendations.getRecommendations('123')
    getRecommendations.httpCode.should.eql(errors.invalidCpf.httpCode)
  })
  it('Should not get recommendations if CPF doesnt exist', () => {
    const getRecommendations = recommendations.getRecommendations('11111111111')
    getRecommendations.httpCode.should.eql(errors.cpfNotFound.httpCode)
  })
  it('Should get recommendations', () => {
    const getRecommendations = recommendations.getRecommendations('45678912300')
    getRecommendations.Response.should.have.lengthOf(2)
  })
})

const mockPerson = () => {
  person.postNewPerson({body: { name: 'joao', cpf: '01234567890' }})
  person.postNewPerson({body: { name: 'maria', cpf: '09876543210' }})
  person.postNewPerson({body: { name: 'eduardo', cpf: '45678912300' }})
  person.postNewPerson({body: { name: 'monica', cpf: '98765465445' }})
  person.postNewPerson({body: { name: 'felipe', cpf: '85205468428' }})
  person.postNewPerson({body: { name: 'joaquin', cpf: '99999999999' }})
  person.postNewPerson({body: { name: 'gabriel', cpf: '77777777777' }})
}

const mockRelationships = () => {
  relationship.postNewRelationship({ cpf1: '01234567890', cpf2: '09876543210' })
  relationship.postNewRelationship({ cpf1: '01234567890', cpf2: '45678912300' })
  relationship.postNewRelationship({ cpf1: '09876543210', cpf2: '98765465445' })
  relationship.postNewRelationship({ cpf1: '45678912300', cpf2: '98765465445' })
  relationship.postNewRelationship({ cpf1: '45678912300', cpf2: '85205468428' })
  relationship.postNewRelationship({ cpf1: '77777777777', cpf2: '01234567890' })
  relationship.postNewRelationship({ cpf1: '45678912300', cpf2: '99999999999' })
}

  const clearMock = () => {
    clean.deleteAll()
  }