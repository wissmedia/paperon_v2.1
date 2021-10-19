const router = require('express').Router()

// @desc    App Root Route
// @route   GET /
router.get('/', (req, res) => {
  res.render('root/index', { navTitle: 'Hello Paperon - Root' })
})

module.exports = router