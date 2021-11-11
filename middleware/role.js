/**
 * @description check email admin in env file
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function isAdmin(req, res, next) {
  if (req.user.email == process.env.ADMIN_EMAIL) {
    return next()
  } else {
    res.redirect('/author')
  }
}

/**
 * @description check role author
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function isAuthor(req, res, next) {
  if (req.user.role == 'author') {
    return next()
  } else {
    res.redirect('/respondent')
  }
}

/**
 * @description no desc yet
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
export function ensureAPIRole(req, res, next) {
  if (req.user.role == 'author') {
    return next()
  } else {
    res.status(400).send({ message: 'Not Allowed' })
  }
}