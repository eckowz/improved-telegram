const person = require('../../service/person')
const constants = require('../../res/constants')
const errors = require('../../res/errorMessage')
require('should')

describe('Person tests', () => {
  beforeEach(() => {
    clearMock()
    mockPerson()
  })
  it('Should return current person length', () => {
    person.check().Response.should.be.equal('Atualmente existem 5 amigos cadastrados.')
  })
  it('Should not accept invalid CPF', () => {
    const post = person.postNewPerson({ body: { name: 'ronaldo', cpf: '9999999999' } })
    post.httpCode.should.be.equal(errors.invalidCpf.httpCode)
    post.msg.should.be.equal(errors.invalidCpf.msg)
  })
  it('Should not accept CPF that already exist', () => {
    const post = person.postNewPerson({ body: { name: 'ronaldo', cpf: '01234567890' } })
    post.httpCode.should.be.equal(errors.cpfAlreadyExist.httpCode)
    post.msg.should.be.equal(errors.cpfAlreadyExist.msg)

  })
  it('Should post a new person', () => {
    const post = person.postNewPerson({ body: { name: 'ronaldo', cpf: '11111111111' } })
    post.Response.should.be.equal(constants.createCompleted)
  })
  it('Should return a person by CPF', () => {
    const post = person.getByCpf('01234567890')
    post.Response.should.be.eql(responseGetByCpf)
  })
  it('Should delete all person', () => {
    const deleteAll = person.deletePerson()
    deleteAll.Response.should.be.equal(constants.deleteCompleted)
  })
})

const mockPerson = () => {
  person.postNewPerson({ body: { name: 'joao', cpf: '01234567890' } })
  person.postNewPerson({ body: { name: 'maria', cpf: '09876543210' } })
  person.postNewPerson({ body: { name: 'eduardo', cpf: '45678912300' } })
  person.postNewPerson({ body: { name: 'monica', cpf: '98765465445' } })
  person.postNewPerson({ body: { name: 'felipe', cpf: '85205468428' } })
}

const clearMock = () => {
  person.deletePerson()
}

const responseGetByCpf = { name: 'joao', cpf: '01234567890' }