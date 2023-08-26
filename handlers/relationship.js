// wiki.js - Wiki route module

const express = require("express")
const router = express.Router()
const relationshipService = require('../service/relationship')

router.get('/check', (req, res) => {
  res.send(relationshipService.check())
})

router.post('/', (req, res) => {
  res.send(relationshipService.createRelationship(req.body))
})

module.exports = router