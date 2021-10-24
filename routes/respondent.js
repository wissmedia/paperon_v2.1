const router = require('express').Router()

// @desc    Responden Index Page
// @route   GET /responden
router.get('/', (req, res) => {
  res.render('respondent/index', { navTitle: 'Hello Paperon - Respondent' })
})

module.exports = router