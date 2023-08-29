const person = require('../../service/person')
const constants = require('../../res/constants')
const errors = require('../../res/errorMessage')
require('should')

describe('Person tests', () => {
  beforeEach(() => {
    clearMock()
    mockPerson()
  })
  it('Should return current person length', async () => {
    const check = await person.check()
    check.should.be.equal('Atualmente existem 5 amigos cadastrados.')
  })
  it('Should not accept invalid CPF', async () => {
    await person.postNewPerson({ body: { name: 'ronaldo', cpf: '9999999999' } }).catch(error => {
      error.httpCode.should.be.eql(errors.invalidCpf.httpCode)
      error.msg.should.be.eql(errors.invalidCpf.msg)
    })

  })
  it('Should not accept CPF that already exist', async () => {
    await person.postNewPerson({ body: { name: 'ronaldo', cpf: '01234567890' } }).catch(error => {
      error.httpCode.should.be.equal(errors.cpfAlreadyExist.httpCode)
      error.msg.should.be.equal(errors.cpfAlreadyExist.msg)
    })
  })
  it('Should post a new person', async () => {
    const post = await person.postNewPerson({ body: { name: 'ronaldo', cpf: '11111111111' } })
    post.should.be.equal(constants.createCompleted)
  })
  it('Should return a person by CPF', async () => {
    const post = await person.getByCpf('01234567890')
    post.should.be.eql(responseGetByCpf)
  })
  it('Should delete all person', async () => {
    const deleteAll = await person.deletePerson()
    deleteAll.should.be.equal(constants.deleteCompleted)
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