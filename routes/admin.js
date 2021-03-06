const router = require('express').Router()
const User = require('../models/user')
const Qbank = require('../models/qbank')
const { simpleDate } = require('../helper/dateFormat')
const { typeChange } = require('../helper/qbankHelper')
const link = '/admin'

/**
 *  @desc    Admin Index Page
 *  @route   GET /admin
 *  @tag     #/admin
 */
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/respondent', icon: 'fas fa-chevron-circle-left', label: 'Respondent' },
    { link: '/author', icon: 'fas fa-chevron-circle-right', label: 'Author' },
  ]
  let UserMenu = [
    { link: `${link}/user-list`, icon: 'fas fa-users', label: 'User Lists' },
    { link: `${link}/user-promote`, icon: 'fas fa-user-plus', label: 'Promote to Author' },
    { link: `${link}/user-demote`, icon: 'fas fa-user-minus', label: 'Demote to Responden' },
    { link: `${link}/user-block`, icon: 'fas fa-user-slash', label: 'Block User', status: 'pending' },
    { link: `${link}/user-delete`, icon: 'fas fa-user-times', label: 'Delete User', status: 'pending' },
    { link: `${link}/user-edit`, icon: 'fas fa-user-edit', label: 'Edit User', status: 'pending' },
    { link: `${link}/user-setting`, icon: 'fas fa-user-cog', label: 'Add Setting', status: 'pending' },
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  let QformMenu = [
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  let QbankMenu = [
    { link: `${link}/qbank-list`, icon: 'fas fa-money-check', label: 'Qbank List' },
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  let ResultMenu = [
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  let SystemMenu = [
    { link: `${link}/api-grant`, icon: 'fas fa-eye', label: 'Grant API Access', status: 'pending' },
    { link: `${link}/api-revoke`, icon: 'fas fa-eye-slash', label: 'Revoke API Access', status: 'pending' },
    { link: `${link}/api-endpoint`, icon: 'fas fa-bullseye', label: 'API Endpoint', status: 'pending' },
    { link: '#', icon: 'fas fa-bug', label: 'Need Update Later' },
  ]
  res.render('admin/index', {
    navTitle: 'Admin Panel',
    navMenu,
    UserMenu,
    QformMenu,
    QbankMenu,
    ResultMenu,
    SystemMenu
  })
})

/**
 *  @desc    User List Page
 *  @route   GET /admin/user-list
 *  @tag     #user-list
 */
router.get('/user-list', async (req, res) => {
  let navMenu = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    // find all user and set to 'users'
    let users = await User.find({}).lean()

    /**
     * Promises of counter
     * count user, author and respondent
     * and set to 'counter'
     */
    let promises = []
    let counter = { user: 0, author: 0, respondent: 0 }
    let countUser = User.countDocuments({})
    let countAuthor = User.countDocuments({ role: 'author' })
    let countRespondent = User.countDocuments({ role: 'respondent' })
    promises.push(countUser, countAuthor, countRespondent)
    await Promise.all(promises)
      .then(result => {
        counter.user = result[0]
        counter.author = result[1]
        counter.respondent = result[2]
      })
    res.render('admin/user-list', {
      navTitle: 'Users List',
      navMenu,
      users,
      counter,
      simpleDate,
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Promote to Author Page
// @route   GET /admin/user-promote
router.get('/user-promote', async (req, res) => {
  let navMenu = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    let users = await User.find({ role: 'respondent' }).lean()
    res.render('admin/role-change', {
      navTitle: 'Promote to Author',
      navMenu,
      users,
      role: 'promote'
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Demote to Respondent Page
// @route   GET /admin/user-demote
router.get('/user-demote', async (req, res) => {
  let navMenu = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    let users = await User.find({ role: 'author' }).lean()
    res.render('admin/role-change', {
      navTitle: 'Demote to Respondent',
      navMenu,
      users,
      role: 'demote'
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Process Promote to Author Page
// @route   PATCH /admin/user-promote
router.patch('/role-change', async (req, res) => {
  let ids = req.body.id
  let changeStatus = ''
  /**
   *  change 'changeStatus' based on role from hidden input
   */
  if (req.body.role == 'promote') {
    changeStatus = 'author'
  }
  if (req.body.role == 'demote') {
    changeStatus = 'respondent'
  }

  try {
    // go to /admin if id is blank or invalid
    if (!ids) {
      return res.redirect('/admin')
    }
    /** 
     *  remove blank hidden value
     *  this is because single data is not array
     */
    if (ids.constructor === Array) {
      ids = ids.filter(item => item)
    }
    /**
     *  Use Promises to handle multiple async update
     */
    let updates = []
    ids.forEach(id => {
      let updatePromise = User.updateMany({ _id: id }, { $set: { role: changeStatus } })
      updates.push(updatePromise)
    })
    Promise.all(updates).then(result => {
      console.log(result)
    })
    /**
     * Change redirect based on role
     */
    if (req.body.role == 'promote') {
      res.redirect('/admin/user-promote')
    }
    if (req.body.role == 'demote') {
      res.redirect('/admin/user-demote')
    }
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

/**
 *  @desc    Qbank List Page
 *  @route   GET /admin/qbank-list
 *  @tag     #qbank-list
 */
router.get('/qbank-list', async (req, res) => {
  let navMenu = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  let QbankMenu = []
  try {
    // find all question and set to 'qbanks'
    let qbanks = await Qbank.find({})
      .populate('user', ['displayName', 'image'])
      .sort({createdAt : 'desc'})
      .lean()
    // count all qbank on db
    let countQbank = await Qbank.countDocuments({})
    res.render('admin/qbank-list',{
      navTitle : 'All Qbank',
      navMenu,
      QbankMenu,
      countQbank,
      qbanks,
      link,
      typeChange,
      simpleDate
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Grand API Access Page
// @route   GET /admin/api-grant
router.get('/api-grant', async (req, res) => {
  let navMenus = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    /**
     * Grant API Key for author only (for now)
     * Later respondent can granted with API Access
     */
    let users = await User.find({
      role: 'author',
      "apiKey.outbound": null
    }).lean()
    res.render('admin/api-token', {
      navTitle: 'Grant API Key',
      navMenus,
      users,
      role: 'api-grant'
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    revoke API Access Page
// @route   GET /admin/api-revoke
router.get('/api-revoke', async (req, res) => {
  let navMenus = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  try {
    let users = await User.find({
      "apiKey.outbound": {
        $exists: true,
        $ne: null
      }
    }).lean()
    res.render('admin/api-token', {
      navTitle: 'Revoke API Key',
      navMenus,
      users,
      role: 'api-revoke'
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    Process Api Access Token Page
// @route   PATCH /admin/api-token
router.patch('/api-token', async (req, res) => {
  let ids = req.body.id
  try {
    // go to /admin if id is blank or invalid
    if (!ids) {
      return res.redirect('/admin')
    }
    /** remove blank hidden value
     *  this is because single data is not array
     */
    if (ids.constructor === Array) {
      ids = ids.filter(item => item)
    }
    /**
     *  Use Promises to handle multiple async update
     *  Conditionally patch based on grant or revoke
     */
    // let updates = []
    // if (req.body.role == 'api-grant') {
    //   ids.forEach(id => {
    //     let updatePromise = User.updateMany({ _id: id }, { $set: { "apiKey.outbound": genApiKey({ method: 'base32' }) } })
    //     updates.push(updatePromise)
    //   })
    // } else if (req.body.role == 'api-revoke') {
    //   ids.forEach(id => {
    //     let updatePromise = User.updateMany({ _id: id }, { $set: { "apiKey.outbound": null } })
    //     updates.push(updatePromise)
    //   })
    // }
    // Promise.all(updates).then(result => {
    //   console.log(result)
    // })
    /**
     * Change redirect based on role
     */
    if (req.body.role == 'api-grant') {
      res.redirect('/admin/api-grant')
    }
    if (req.body.role == 'api-revoke') {
      res.redirect('/admin/api-revoke')
    }
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

// @desc    API Endpoint Page
// @route   GET /admin/api-endpoint
router.get('/api-endpoint', async (req, res) => {
  let navMenus = [
    { link: `${link}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]

  res.render('admin/endpoint', {
    navTitle: 'API Endpoint List',
    navMenus,
  })

})

module.exports = router