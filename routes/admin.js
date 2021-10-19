const router = require('express').Router()

// @desc    Admin Index Page
// @route   GET /admin
router.get('/', (req, res) => {
  res.render('admin/index', { navTitle: 'Hello Paperon - Admin' })
})

module.exports = router