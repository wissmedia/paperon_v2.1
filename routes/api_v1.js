import { Router } from 'express'
import QBank from '../models/qbank.js'

const router = Router()

// @desc    HealthCheck 
// @route   GET /api/v1
router.get('/', (req, res) => {
  res.status(200).send({
    data:
    {
      message: 'API is Healty',
      user: req.user.id
    }
  })
})

// @desc    Qbank List Page
// @route   GET /api/v1/qbank
router.get('/qbank', async (req, res) => {
  try {
    const qbanks = await QBank.find({ user: req.user.id })
      .sort({ createdAt: 'desc' })
      .lean()

    // console.log(qbanks)
    res.json(qbanks)
  } catch (error) {
    console.error(error)
    // return res.render('error/index')
  }
})

export default router