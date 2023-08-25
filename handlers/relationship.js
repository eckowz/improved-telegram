// wiki.js - Wiki route module

const express = require("express")
const router = express.Router()
const errors = require('../res/errorMessage')
const relationshipService = require('../service/relationship')

router.post('/', (req, res) => {
  res.send(relationshipService.createRelationship(req.body))
})

module.exports = router