const router = require('express').Router()
const link = '/author'

// @desc    Author Index Page
// @route   GET /author
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/respondent', icon: 'fas fa-chevron-circle-left', label: 'Respondent' },
  ]
  let AuthorMenu = [
    { link: `${link}/qbank`, icon: 'fas fa-warehouse', label: 'QBank' },
    { link: `${link}/qform`, icon: 'fas fa-newspaper', label: 'QForm' },
    { link: `${link}/result`, icon: 'fas fa-poll', label: 'Result' },
  ]
  let AuthorSetting = [
    { link: `${link}/setting`, icon: 'fas fa-cogs', label: 'Setting' },
    { link: `${link}/get-api`, icon: 'fas fa-eye', label: 'Get API Key' },
  ]
  res.render('author/index', {
    navTitle: 'Author Panel',
    navMenu,
    AuthorMenu,
    AuthorSetting
  })
})

// @desc    Qbank List Page
// @route   GET /author/qbank
router.get('/qbank', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('author/qbank', {
      navTitle: 'Qbank',
      navMenu,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Qform List Page
// @route   GET /author/qform
router.get('/qform', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('author/qform', {
      navTitle: 'Qform',
      navMenu,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Result List Page
// @route   GET /author/result
router.get('/result', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('author/result', {
      navTitle: 'Result',
      navMenu,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Setting Page
// @route   GET /author/setting
router.get('/setting', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('author/setting', {
      navTitle: 'Author Setting',
      navMenu,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

module.exports = router