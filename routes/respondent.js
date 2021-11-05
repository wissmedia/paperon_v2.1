const router = require('express').Router()
const User = require('../models/user')
const link = {
  root: '/respondent',
  respo_promote: '/respondent/promote'
}

// @desc    Responden Index Page
// @route   GET /responden
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/', icon: 'far fa-laugh-beam', label: 'Paperon' },
  ]
  let RespoMenu = [
    { link: `${link.root}/public`, icon: 'fas fa-bug', label: 'Public', status: 'pending' },
    { link: `${link.root}/code`, icon: 'fas fa-bug', label: 'Use Code', status: 'pending' },
  ]
  let RespoSettMenu = [
    { link: `${link.root}/profile`, icon: 'fas fa-id-badge', label: 'Profile', status: 'pending' },
    { link: `${link.root}/promote`, icon: 'fas fa-feather-alt', label: 'Become Author' },
  ]

  res.render('respondent/index', {
    navTitle: 'Respondent Panel',
    navMenu,
    RespoMenu,
    RespoSettMenu,
  })
})

router.route('/promote')
  .get((req, res) => {
    let navMenu = [
      { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    ]
    // get id and role from locals.user
    let { id, role } = res.locals.user
    let user = { id, role }
    res.render('respondent/promote', {
      navTitle: 'Become Author',
      navMenu,
      link,
      user
    })
  })
  .patch(async (req, res) => {
    id = req.query.id
    try {
      // console.log(id)
      await User.findByIdAndUpdate(id, { role: 'author' })
      res.redirect('/author')
    } catch (error) {
      console.error(error)
      // return res.render('error/index')
    }
  })

router.route('/profile')
  .get((req, res) => {
    let navMenu = [
      { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    ]
    res.render('user/profile', {
      navTitle: 'Your Profile',
      navMenu,
    })
  })

module.exports = router