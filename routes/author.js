const router = require('express').Router()
const createQC = require('generate-api-key')
const QBank = require('../models/qbank')
const QForm = require('../models/qform')

const { typeChange, qbankRender, qbankEdit, warnMess, isWajibCB, pendWajib } = require('../helper/qbankHelper')
const { simpleDate } = require('../helper/dateFormat')
const { removeKeys, qbankArrayRender } = require('../helper/qformHelper')

const link = {
  root: '/author',
  qbank: '/author/qbank',
  qbank_add: '/author/qbank-add',
  qbank_detail: '/author/qbank-detail',
  qbank_edit: '/author/qbank-edit',
  qbank_delete: '/author/qbank-delete',
  qform: '/author/qform',
  qform_add: '/author/qform-add',
  qform_detail: '/author/qform-detail',
  qform_edit: '/author/qform-edit',
  qform_delete: '/author/qform-delete',
}

/**
 *  @desc    Author Index Page
 *  @route   GET /author
 */
router.get('/', (req, res) => {
  let navMenu = [
    { link: '/respondent', icon: 'fas fa-chevron-circle-left', label: 'Respondent' },
  ]
  let AuthorMenu = [
    { link: `${link.root}/qbank`, icon: 'fas fa-warehouse', label: 'QBank' },
    { link: `${link.root}/qform`, icon: 'fas fa-newspaper', label: 'QForm' },
    { link: `${link.root}/result`, icon: 'fas fa-poll', label: 'Result', status: 'pending' },
  ]
  let AuthorSetting = [
    { link: `${link.root}/profile`, icon: 'fas fa-id-badge', label: 'Profile', status: 'pending' },
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
 *  @desc    Qbank List Page
 *  @route   GET /author/qbank
 */
router.get('/qbank', async (req, res) => {
  let navMenu = [
    { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    { link: `${link.qbank_add}`, icon: 'fas fa-plus-circle', label: 'Add' },
  ]
  let QbankMenu = [
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'Mass Add', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'More Detail', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'Mass Edit', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'Mass Delete', status: 'pending' },
  ]
  try {
    const qbanks = await QBank.find({ user: req.user.id })
      .sort({ createdAt: 'desc' })
      .lean()

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

/**
 *  @desc    Qbank Add Page Chain Method
 *  @route   GET /author/qbank-add
 *  @route   POST /author/qbank-add
 *  @tag     #qbank-add
 */
router.route('/qbank-add')
  .get(async (req, res) => {
    let navMenu = [
      { link: `${link.qbank}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
      { link: 'javascript:;', icon: 'fas fa-plus', label: 'Options', id: 'add' },
    ]
    try {
      res.render('author/qbank-add', {
        navTitle: 'Create Question',
        navMenu,
        link
      })
    } catch (error) {
      console.error(error)
      // return res.render('error/index')
    }
  })
  .post(async (req, res) => {
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
 *  @desc    Qbank Detail Page
 *  @route   GET /author/qbank-detail/?id=x
 *  @tag     #qbank-detail
 *  @query   id = qbank id
 */
router.get('/qbank-detail', async (req, res) => {
  let navMenu = [
    { link: `${link.qbank}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  let id = req.query.id
  try {
    const qbank = await QBank.findById(id).lean()

    // console.log(qbanks)

    res.render('author/qbank-detail', {
      navTitle: 'Question Preview',
      navMenu,
      qbank,
      link,
      typeChange,
      qbankRender,
      simpleDate
    })
    // res.json(qbanks)
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }

})

/**
 *  @desc    Qbank Detail Page
 *  @route   GET /author/qbank-edit/?id=x
 *  @tag     #qbank-edit
 *  @query   id = qbank id
 */
router.route('/qbank-edit')
  .get(async (req, res) => {
    let navMenu = [
      { link: `${link.qbank}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    ]
    let id = req.query.id
    try {
      const qbank = await QBank.findById(id).lean()

      res.render('author/qbank-edit', {
        navTitle: 'Edit Question',
        navMenu,
        qbank,
        typeChange,
        qbankEdit,
        warnMess,
        isWajibCB,
        pendWajib,
        link
      })
      // res.json(qbank)
    } catch (error) {
      console.error(error)
      // return res.render('error/index')
    }
  })
  .patch(async (req, res) => {
    let id = req.query.id
    try {
      // find useWajib on req.body object, if false set useWajib to " "
      if (!req.body.hasOwnProperty('useWajib')) {
        req.body.useWajib = ''
      }
      await QBank.findByIdAndUpdate(id, req.body)
      res.redirect(`${link.qbank}`)
    } catch (error) {
      console.error(error)
    }
  })

/**
 *  @desc    Qbank Delete
 *  @route   DELETE /author/qbank-delete/?id=x
 *  @tag     #qbank-delete
 *  @query   id = qbank id
 */
router.delete('/qbank-delete', async (req, res) => {
  let id = req.query.id
  try {
    await QBank.deleteOne({ _id: id })
    res.redirect(`${link.qbank}`)
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

/**
 *  @desc    Qform List Page
 *  @route   GET /author/qform
 *  @tag     #qform
 */
router.get('/qform', async (req, res) => {
  let navMenu = [
    { link: '/author', icon: 'fas fa-chevron-circle-left', label: 'Back' },
    { link: `${link.qform_add}`, icon: 'fas fa-plus-circle', label: 'Add' },
  ]
  let QformMenu = [
    { link: `${link.qform_add}`, icon: 'fas fa-bug', label: 'Mass Add', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'More Detail', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'Mass Edit', status: 'pending' },
    { link: `${link.qbank_add}`, icon: 'fas fa-bug', label: 'Mass Delete', status: 'pending' },
  ]
  let qforms = await QForm.find({}).lean()
  try {
    res.render('author/qform-index', {
      navTitle: 'Qform Panel',
      navMenu,
      link,
      QformMenu,
      qforms
    })
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

router.route('/qform-add')
  .get(async (req, res) => {
    let navMenu = [
      { link: `${link.qform}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
    ]
    step = parseInt(req.query.step)
    let id = ''
    let qform = ''
    switch (step) {
      case 1:
        id = req.query.id
        qform = ''
        let qbanks = []
        try {
          qform = await QForm.findById(id).lean()
          qbanks = await QBank.find({ user: req.user.id })
            .sort({ createdAt: 'desc' })
            .lean()
        } catch (error) {
          console.error(error)
        }
        return res.render('author/qform-add-select', {
          navTitle: 'Create QForm',
          navMenu,
          link,
          id,
          step,
          qform,
          qbanks,
          typeChange
        })
      case 2:
        id = req.query.id
        try {
          qform = await QForm.findById(id).lean()
        } catch (error) {
          console.error(error)
        }
        return res.render('author/qform-add-order', {
          navTitle: 'Create QForm',
          navMenu,
          link,
          id,
          step,
          qform,
          typeChange
        })
      case 3:
        id = req.query.id
        try {
          qform = await QForm.findById(id, { "status": 1, "state": 1, "qcode": 1, }).lean()
        } catch (error) {
          console.error(error)
        }
        return res.render('author/qform-add-publish', {
          navTitle: 'Create QForm',
          navMenu,
          link,
          id,
          step,
          qform,
        })
      default:
        return res.render('author/qform-add', {
          navTitle: 'Create QForm',
          navMenu,
          link
        })
    }
  })
  .post(async (req, res) => {
    let step = parseInt(req.query.step)
    let idF = ''
    let db = ''
    let body = ''
    switch (step) {
      case 0:
        body = req.body
        body.step = step
        try {
          let qform = new QForm(body)
          await qform.save()
          res.redirect(`${link.qform_add}/?step=1&id=${qform._id}`)
        } catch (error) {
          console.error(error)
        }
        break;
      case 1:
        let { idQ } = req.body
        idF = req.query.id
        let qbanks = []
        let newData = []
        let idS = []
        try {
          db = await QBank.find({ '_id': { $in: idQ } }).lean()
          // Loop to change objectId of _id to array of id Strings in idS
          for (let i = 0; i < db.length; i++) {
            let id = db[i]._id.toString()
            idS.push(id)
          }
          // Loop to remove keys form data array, saved as newData
          let remove = ['_id', 'user', '__v', 'createdAt', 'updatedAt']
          for (let i = 0; i < db.length; i++) {
            let result = removeKeys(db[i], remove)
            newData.push(result)
          }
          // Loop to create qbanks object array, will saved later to qbanksArray in qform
          for (let i = 0; i < db.length; i++) {
            let qbank = {
              id: idS[i],
              order: null,
              priority: null,
              data: newData[i]
            }
            qbanks.push(qbank)
          }
          await QForm.findByIdAndUpdate(idF, { "step": step, "qbankArray": qbanks })
          res.redirect(`${link.qform_add}/?step=2&id=${idF}`)
        } catch (error) {
          console.error(error)
        }
        break;
      case 2:
        idF = req.query.id
        body = req.body
        try {
          db = await QForm.findById(idF, { "qbankArray": 1 }).lean()
          // add priority based on body keys
          for (let i = 0; i < Object.keys(body).length; i++) {
            if (db.qbankArray[i].id == Object.keys(body)[i]) {
              db.qbankArray[i].priority = body[db.qbankArray[i].id]
            }
          }
          await QForm.findByIdAndUpdate(idF, { "step": step, "qbankArray": db.qbankArray })
          res.redirect(`${link.qform_add}/?step=3&id=${idF}`)
        } catch (error) {
          console.error(error)
        }
        break;
      case 3:
        idF = req.query.id
        body = req.body
        body.step = step
        try {
          if (body.state == 'private') {
            body.qcode = createQC({ method: 'string', pool: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', length: 4 })
          }
          await QForm.findByIdAndUpdate(idF, body)
          res.redirect(`${link.qform_detail}/?id=${idF}`)
        } catch (error) {
          console.error(error)
        }
        break;
      default:
        break;
    }
  })

router.get('/qform-detail', async (req, res) => {
  let navMenu = [
    { link: `${link.qform}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  let id = req.query.id
  try {
    let qform = await QForm.findById(id).lean()
    qform.qbankArray.sort((a, b) => (a.priority > b.priority ? 1 : -1))
    res.render('author/qform-detail', {
      navTitle: 'Create QForm',
      navMenu,
      link,
      qform,
      simpleDate,
      qbankArrayRender
    })
  } catch (error) {
    console.error(error)
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

router.get('/profile', (req, res) => {
  let navMenu = [
    { link: `${link.root}`, icon: 'fas fa-chevron-circle-left', label: 'Back' },
  ]
  res.render('user/profile', {
    navTitle: 'Your Profile',
    navMenu,
    user: res.locals.user
  })
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