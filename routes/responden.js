const router = require('express').Router()

// @desc    Responden Index Page
// @route   GET /responden
router.get('/', (req, res) => {
  res.render('responden/index', { navTitle: 'Hello Paperon - Responden' })
})

module.exports = router