/**
 * @description check if any session
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/')
  }
}

/**
 * @description check if session is still there after tab close
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/author')
  } else {
    return next()
  }
}

/**
 * @description no desc yet
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function ensureAPIAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.status(400).send({ message: '400 error' })
  }
}
