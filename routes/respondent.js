const router = require('express').Router()
const User = require('../models/user')
const QForm = require('../models/qform')

const { simpleDate } = require('../helper/dateFormat')
const { qbankArrayRender } = require('../helper/qformHelper')
const { respoQRender } = require('../helper/respoHelper')

const link = {
  root: '/respondent',
  public: '/respondent/public',
  private: '/respondent/private',
  promote: '/respondent/promote',
  profile: '/respondent/profile',
}

// @desc    Responden Index Page
// @route   GET /responden
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/', icon: 'far fa-laugh-beam', label: 'Paperon' },
  ]
  let RespoMenu = [
    { link: `${link.public}`, icon: 'fas fa-poll-h', label: 'Public' },
    { link: `${link.private}`, icon: 'fas fa-key', label: 'Use Code' },
  ]
  let RespoSettMenu = [
    { link: `${link.profile}`, icon: 'fas fa-id-badge', label: 'Profile', status: 'pending' },
    { link: `${link.promote}`, icon: 'fas fa-feather-alt', label: 'Become Author' },
  ]

  res.render('respondent/index', {
    navTitle: 'Respondent Panel',
    navMenu,
    RespoMenu,
    RespoSettMenu,
  })
})

router.route('/public')
  .get(async (req, res) => {
    let navMenu = [
      { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    ]
    let qforms = null
    // check if req.query has property of 'id'
    // if true render answer page
    if (req.query.hasOwnProperty('id')) {
      try {
        qforms = await QForm.findById(req.query.id)
          .populate('userId', ['displayName'])
          .lean()
        res.render('respondent/public-qform', {
          navTitle: 'Public QFrom',
          navMenu,
          qforms,
          link,
          simpleDate,
          respoQRender
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      // if false render public page
      try {
        qforms = await QForm.find({ state: 'public', status: 'publish' })
          .populate('userId', ['displayName'])
          .lean()
        res.render('respondent/public', {
          navTitle: 'Public QFrom',
          navMenu,
          qforms,
          link,
          simpleDate
        })
      } catch (error) {
        console.error(error)
      }
    }
  })
  .post((req, res) => {
    let id = req.query.id
    let { idQ, ...body } = req.body
    createNewDb('dbBaru')
    console.log({ id, idQ, body })
  })

router.get('/private', (req, res) => {
  let navMenu = [
    { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  res.json({
    mess: 'Private',
    navTitle: 'Private QFrom',
    navMenu,
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