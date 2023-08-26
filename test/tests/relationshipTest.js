const person = require('../../service/person')
const relationship = require('../../service/relationship')
const clean = require('../../service/clean')
const constants = require('../../res/constants')
const errors = require('../../res/errorMessage')
require('should')

describe('Relationship tests', () => {
  beforeEach(() => {
    clearMock()
    mockPerson()
    mockRelationships()
  })
  it('Should return current relationship length', () => {
    relationship.check().Response.should.be.equal('Atualmente existem 5 relacionamentos cadastrados.')
  })
  it('Should not create relationship for invalid CPF', () => {
    const checkCpf1 = relationship.createRelationship({ cpf1: '123', cpf2: '09876543210' })
    checkCpf1.cpf1.httpCode.should.be.equal(errors.invalidCpf.httpCode)
    const checkCpf2 = relationship.createRelationship({ cpf1: '01234567890', cpf2: '123' })
    checkCpf2.cpf2.httpCode.should.be.equal(errors.invalidCpf.httpCode)
  })
  it('Should create a relationship', () => {
    const createRelationship = relationship.createRelationship({ cpf1: '01234567890', cpf2: '09876543210' })
    createRelationship.Response.should.be.eql(constants.relationshipCreated)
  })
  it('Should return a relationship by cpf', () => {
    const getByCpf = relationship.getRelationshipByCpf('09876543210')
    getByCpf.should.be.instanceOf(Array).and.have.lengthOf(2)
    getByCpf.should.be.eql(getByCpfResponse)
  })
  it('Should delete all relationship', () => {
    const deleteAll = relationship.deleteRelationship()
    deleteAll.Response.should.be.equal(constants.deleteCompleted)
  })
})

const mockPerson = () => {
  person.postNewPerson({body: { name: 'joao', cpf: '01234567890' }})
  person.postNewPerson({body: { name: 'maria', cpf: '09876543210' }})
  person.postNewPerson({body: { name: 'eduardo', cpf: '45678912300' }})
  person.postNewPerson({body: { name: 'monica', cpf: '98765465445' }})
  person.postNewPerson({body: { name: 'felipe', cpf: '85205468428' }})
}

const mockRelationships = () => {
  relationship.postNewRelationship({ cpf1: '01234567890', cpf2: '09876543210' })
  relationship.postNewRelationship({ cpf1: '01234567890', cpf2: '45678912300' })
  relationship.postNewRelationship({ cpf1: '09876543210', cpf2: '98765465445' })
  relationship.postNewRelationship({ cpf1: '45678912300', cpf2: '98765465445' })
  relationship.postNewRelationship({ cpf1: '45678912300', cpf2: '85205468428' })
}

  const clearMock = () => {
    clean.deleteAll()
  }

  const getByCpfResponse =  [
    { cpf1: '01234567890', cpf2: '09876543210' },
    { cpf1: '09876543210', cpf2: '98765465445' }
  ]
  