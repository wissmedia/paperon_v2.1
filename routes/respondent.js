const router = require('express').Router()
const link = '/respondent'

// @desc    Responden Index Page
// @route   GET /responden
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/', icon: 'far fa-laugh-beam', label: 'Paperon' },
  ]
  let RespoMenu = [
    { link: `${link}/public`, icon: 'fas fa-bug', label: 'Public', status: 'pending' },
    { link: `${link}/code`, icon: 'fas fa-bug', label: 'Use Code', status: 'pending' },
  ]
  let RespoSettMenu = [
    { link: `${link}/promote`, icon: 'fas fa-bug', label: 'Become Author', status: 'pending' },
  ]
  res.render('respondent/index', { 
    navTitle: 'Respondent Panel',
    navMenu, 
    RespoMenu,
    RespoSettMenu
  })
})

module.exports = router