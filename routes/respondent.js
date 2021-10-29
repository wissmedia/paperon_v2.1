const router = require('express').Router()
const link = '/respondent'

// @desc    Responden Index Page
// @route   GET /responden
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  let RespoMenu = [
    { link: `${link}/public`, icon: 'fas fa-bug', label: 'Public' },
    { link: `${link}/code`, icon: 'fas fa-bug', label: 'Use Code' },
  ]
  res.render('respondent/index', { 
    navTitle: 'Respondent Panel',
    navMenu, 
    RespoMenu
  })
})

module.exports = router