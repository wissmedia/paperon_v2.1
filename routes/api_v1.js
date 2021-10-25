const router = require('express').Router()
const User = require('../models/user')

// @desc    All User
// @route   GET /api/v1/all-user
router.get('/all-users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
})

module.exports = router