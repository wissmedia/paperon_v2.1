// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const methodOverride = require('method-override')

// IMPORT AUTH AND ROLE MIDDLEWARE
const { ensureAuth, isAuth, ensureAPIAuth } = require('./middleware/auth')
const { isAdmin, isAuthor, ensureAPIRole } = require('./middleware/role')

// LOAD DB CONFIG
const connectDB = require('./config/db')

// LOAD ENV CONFIG
dotenv.config({ path: './config/config.env' })

// LOAD PASSPORT CONFIG
require('./config/passport')(passport)

// CREATE EXPRESS APP
const app = express()
const PORT = process.env.PORT || 80
const HOST = process.env.HOST || '0.0.0.0'

// GLOBAL VARIABLES
app.locals.appNames = {
  title: 'Paperon',
  subtitle: 'Survei dan Kuesioner',
  version: '1.2.1'
}

// USE BODY PARSER
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// METHOD OVERRIDE (to use PUT and DELETE on front-side js)
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// LOGGER (if on development mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// SET EJS VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// SESSIONS
const maxAge = 60 * 60 * 1000 * 24 // 1 day
app.use(session({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: maxAge,
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
}))

// PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

// SET USER AS GLOBAL VARIABLE
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES LISTS
// @desc    App Root Route
// @route   GET /
// @note    Check if user is authenticate (true -> '/author', false -> '/')
app.get('/', isAuth, (req, res) => {
  res.render('root/index', { navTitle: 'Hello Paperons' })
})

// @desc    App Auth Route
// @route   GET /auth
// @note    Route to authenticated user
app.use('/auth', require('./routes/auth'))

// @desc    App Admin Route
// @route   GET /admin
// @note    Check if user is authenticate and have role as admin
app.use('/admin', [ensureAuth, isAdmin], require('./routes/admin'))

// @desc    App Author Route
// @route   GET /author
// @note    Check if user is authenticate and have role as author
app.use('/author', [ensureAuth, isAuthor], require('./routes/author'))

// @desc    App Respondent Route
// @route   GET /respondent
// @note    Authenticated user have role as respondent
app.use('/respondent', ensureAuth, require('./routes/respondent'))

// @desc    API Endpoint Route
// @route   GET /api/v1
// @note    Authenticated user have role as respondent
app.use('/api/v1', [ensureAPIAuth, ensureAPIRole], require('./routes/api_v1'))

app.use('/anon', require('./routes/anon'))
app.use('/manual', require('./routes/manual'))

// TRY CONNECT TO DB THEN START SERVER
try {
  connectDB().then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Server Running on: http://${HOST}/${PORT}`)
    })
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}

/**
 *  @desc    Route Not Found (404)
 *  @route   GET /*
 *  @note    If route not found, render this error page
 */
app.use((req, res) => {
  res.status(404).render('alarm')
})