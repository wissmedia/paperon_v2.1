const router = require('express').Router()
const User = require('../models/user')


// @desc    HealthCheck 
// @route   GET /api/v1
router.get('/', (req, res) => {
  res.status(200).send({ data: { message: 'API is Healty' } })
})

module.exports = router