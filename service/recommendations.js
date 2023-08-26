const utils = require('../utils/response')
const errors = require('../res/errorMessage')
const person = require('./person')
const relationship = require('./relationship')
const assembler = require('../utils/assembler')

const removeSelfFromList = (self, list) => {
  const result = list.filter((item) => item != self)
  return result
}

const sortByAppearance = (list) => {
  const sortedList = list.sort((a, b) => { return list.indexOf(a) - list.indexOf(b) })
  const result = [...new Set(sortedList)]
  return result
}

const getFriends = (req) => {
  const friends = relationship.getRelationshipByCpf(req)
  const list = friends.map((relationship) => relationship.cpf1 != req ? relationship.cpf1 : relationship.cpf2)
  const result = assembler.assembleFriendsList(req, list)
  return result
}

const getPossibleFriends = (self, myFriends) => {
  const possibleFriendsList = assembler.assembleFriendsList(self, myFriends.list.map((list) => getFriends(list)))
  const result = assembler.assembleFriendsList(self, possibleFriendsList.list.map((friendsList) => removeSelfFromList(self, friendsList.list)))
  return result
}

const getRecommendations = (req) => {
  const checkCpf = person.getByCpf(req)
  if (checkCpf.Response) {
    const possibleFriends = getPossibleFriends(req, getFriends(req))
    const sortedList = sortByAppearance(possibleFriends.list.flat())
    return utils.msg(sortedList)
  } else {
    return checkCpf
  }
}

module.exports = {
  getRecommendations
}