
const code = newCode => { return 4000 + newCode }

module.exports = {

  errorTemplate: {
    httpCode: 400,
    code: code(1),
    msg: ''
  },
  invalidCpf: {
    httpCode: 400,
    code: code(2),
    msg: 'Número inválido de caracteres no CPF.'
  },
  cpfAlreadyExist: {
    httpCode: 400,
    code: code(2),
    msg: 'O CPF informado já existe.'
  },
  cpfNotFound: {
    httpCode: 404,
    code: code(3),
    msg: 'CPF não localizado.'
  },
}