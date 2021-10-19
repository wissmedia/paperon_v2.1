module.exports = {
  isAdmin: function (req, res, next) {
    if (req.user.role == 'admin') {
      return next()
    } else {
      res.redirect('/author')
    }
  },
  isAuthor: function (req, res, next) {
    if (req.user.role == 'author') {
      return next()
    } else {
      res.redirect('/responden')
    }
  }
}