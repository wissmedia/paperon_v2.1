const router = require('express').Router()

router.get('/', (req,res) => {
  res.json({mess:'anon'})
})

module.exports = router