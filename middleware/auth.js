module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  isAuth: function(req,res,next) {
    if(req.isAuthenticated()){
      res.redirect('/author')
    } else {
      return next()
    }
  },
}