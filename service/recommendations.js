const person = require('./person')
const relationship = require('./relationship')
const assembler = require('../utils/assembler')

const removeSelfFromList = (self, list) => {
  const result = list.filter((item) => item != self)
  return result
}

const sortByAppearance = async (list) => {
  const sortedList = list.sort((a, b) => { return list.indexOf(a) - list.indexOf(b) })
  const result = [...new Set(sortedList)]
  return result
}

const getFriends = async (req) => {
  const friends = await relationship.getRelationshipByCpf(req)
  const list = friends.map((relationship) => relationship.cpf1 != req ? relationship.cpf1 : relationship.cpf2)
  const result = await assembler.assembleFriendsList(req, list)
  return result
}

const getPossibleFriends = async (self, myFriends) => {
  const possibleFriendsList = await assembler.assembleFriendsList(self,
    await Promise.all(myFriends.list.map((list) => getFriends(list))))
  const result = await assembler.assembleFriendsList(self,
    possibleFriendsList.list.map((friendsList) => removeSelfFromList(self, friendsList.list)))
  return result
}

const getRecommendations = async (req) => {
  const checkCpf = await person.getByCpf(req)
  if (checkCpf) {
    const friends = await getFriends(req)
    const possibleFriends = await getPossibleFriends(req, friends)
    const sortedList = await sortByAppearance(possibleFriends.list.flat())
    return sortedList
  }
}

module.exports = {
  getRecommendations
}