const express = require("express")
const router = express.Router()
const recommendationsService = require('../service/recommendations')

router.get('/:CPF', (req, res) => {
  res.send(recommendationsService.getRecommendations(req.params.CPF))
})

module.exports = router