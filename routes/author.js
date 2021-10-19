const router = require('express').Router()

// @desc    Author Index Page
// @route   GET /author
router.get('/', (req, res) => {
  res.render('author/index', { navTitle: 'Hello Paperon - Author' })
})

module.exports = router