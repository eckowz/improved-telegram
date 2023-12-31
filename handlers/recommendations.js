const express = require("express")
const router = express.Router()
const recommendationsService = require('../service/recommendations')

router.get('/:CPF', (req, res, next) => {
  recommendationsService.getRecommendations(req.params.CPF)
    .then(response => res.json(response))
    .catch(err => next(err))
})

module.exports = router