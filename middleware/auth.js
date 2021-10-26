module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  isAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/author')
    } else {
      return next()
    }
  },
  ensureAPIAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.status(400).send({ message: '400 error' })
    }
  }
}