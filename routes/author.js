const router = require('express').Router()
const QBank = require('../models/qbank')
const fetch = require('node-fetch')
const { typeChange } = require('../helper/qbankHelper')
const { simpleDate } = require('../helper/dateFormat')

const link = {
  root: '/author',
  qbank: '/author/qbank',
  qbank_add: '/author/qbank-add',
  qbank_detail: '/author/qbank-detail',
  qbank_edit: '/author/qbank-edit',
  qbank_delete: '/author/qbank-delete',
}

// @desc    Author Index Page
// @route   GET /author
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/respondent', icon: 'fas fa-chevron-circle-left', label: 'Respondent' },
  ]
  let AuthorMenu = [
    { link: `${link.root}/qbank`, icon: 'fas fa-warehouse', label: 'QBank' },
    { link: `${link.root}/qform`, icon: 'fas fa-newspaper', label: 'QForm', status: 'pending' },
    { link: `${link.root}/result`, icon: 'fas fa-poll', label: 'Result', status: 'pending' },
  ]
  let AuthorSetting = [
    { link: `${link.root}/setting`, icon: 'fas fa-cogs', label: 'Setting', status: 'pending' },
    { link: `${link.root}/get-api`, icon: 'fas fa-eye', label: 'Get API Key', status: 'pending' },
  ]
  res.render('author/index', {
    navTitle: 'Author Panel',
    navMenu,
    AuthorMenu,
    AuthorSetting
  })
})

/**
 * QBank Routes
 */
// @desc    Qbank List Page
// @route   GET /author/qbank
router.get('/qbank', async (req, res) => {
  let navMenu = [
    { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    { link: `${link.qbank_add}`, icon: 'fas fa-plus-circle', label: 'Add' },
  ]
  let QbankMenu = [
    { link: `${link.qbank_add}`, icon: 'fas fa-plus-circle', label: 'Add', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-plus-circle', label: 'More Detail', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-plus-circle', label: 'Edit', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-plus-circle', label: 'Delete', status: 'pending' },
  ]
  try {
    const qbanks = await QBank.find({ user: req.user.id })
      .sort({ createdAt: 'desc' })
      .lean()

    // console.log(qbanks)

    res.render('author/qbank-index', {
      navTitle: 'Qbank Panel',
      navMenu,
      QbankMenu,
      qbanks,
      link,
      typeChange
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Qbank Add Page
// @route   GET /author/qbank-add
router.get('/qbank-add', async (req, res) => {
  let navMenu = [
    { link: `${link.qbank}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    { link: 'javascript:;', icon: 'fas fa-plus', label: 'Options', id: 'add' },
  ]
  try {
    res.render('author/qbank-add', {
      navTitle: 'Create Question',
      navMenu,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Qbank Detail Page
// @route   GET /author/qbank-detail/?id=x
router.get('/qbank-detail', async (req, res) => {
  let id = req.query.id
  try {
    const qbank = await QBank.find({ _id: id })
      .sort({ createdAt: 'desc' })
      .lean()

    // console.log(qbanks)

    // res.render('author/qbank-index', {
    //   navTitle: 'Qbank Panel',
    //   navMenu,
    //   QbankMenu,
    //   qbanks,
    //   link
    // })
    res.json(qbank)
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }

})

// @desc    x
// @route   GET /x
router.get('/qbank/fetch', async (req, res) => {
  // let id = req.query.id
  try {
    fetch('http://pcku.com:2021/api/v1/qbank')
      .then(res => res.json())
      .then(json => console.log(json))
    // const qbank = await QBank.find({ _id: id })
    //   .sort({ createdAt: 'desc' })
    //   .lean()

    // // console.log(qbanks)

    // // res.render('author/qbank-index', {
    // //   navTitle: 'Qbank Panel',
    // //   navMenu,
    // //   QbankMenu,
    // //   qbanks,
    // //   link
    // // })
    // res.json(qbank)
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }

})

// @desc    Process Qbank Add
// @route   POST /author/qbank/add
router.post('/qbank/add', async (req, res) => {
  try {
    // get user from req.user and set to body.user
    req.body.user = req.user.id

    // redirect if body text is whitespace (' ')
    if (req.body.body === ' ') {
      return res.redirect(`${link.qbank}`)
    }

    // save all data from req.body to db
    const qbank = new QBank(req.body)
    await qbank.save()
    res.redirect(`${link.qbank}`)
  } catch (error) {
    console.error(error)
    // return res.render('error/500')
  }
})

/**
 * QFrom Routes
 */
// @desc    Qform List Page
// @route   GET /author/qform
router.get('/qform', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('author/qform', {
      navTitle: 'Qform Panel',
      navMenu,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

/**
 * Result Routes
 */
// @desc    Result List Page
// @route   GET /author/result
router.get('/result', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    res.render('author/result', {
      navTitle: 'QForm Result',
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