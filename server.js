// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

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
app.get('/', (req, res) => {
  res.render('root/index', { navTitle: 'Hello Paperon - Root' })
})
// @desc    App Auth Route
// @route   GET /auth
app.use('/auth', require('./routes/auth'))
// @desc    App Author Route
// @route   GET /author
app.get('/author', (req, res) => {
  res.render('author/index', { navTitle: 'Hello Paperon - Author' })
})
// @desc    App Responden Route
// @route   GET /responden
app.get('/responden', (req, res) => {
  res.render('responden/index', { navTitle: 'Hello Paperon - Responden' })
})
// @desc    App Admin Route
// @route   GET /admin
app.get('/admin', (req, res) => {
  res.render('admin/index', { navTitle: 'Hello Paperon - Admin' })
})

// CONNECT TO DB
connectDB()

// SERVER START
app.listen(PORT, HOST, () => {
  console.log(`Server Running on: http://${HOST}:${PORT}`)
})