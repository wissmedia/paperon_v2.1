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
  ]
  res.render('author/index', {
    navTitle: 'Author Panel',
    navMenu,
    AuthorMenu,
    AuthorSetting
  })
})

// @desc    Qbank List Page
// @route   GET /admin/user-promote
router.get('/qbank', async (req, res) => {
  let navMenus = [
    { link: '/', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('admin/role-change', {
      navTitle: 'Promote to Author',
      navMenus,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

module.exports = router