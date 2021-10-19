// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')

// LOAD DB CONFIG
const connectDB = require('./config/db')

// LOAD ENV CONFIG
dotenv.config({ path: './config/config.env' })

// CREATE EXPRESS APP
const app = express()
const PORT = process.env.PORT || 80
const HOST = process.env.HOST || '0.0.0.0'

// BODY PARSER
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// LOGGER (if on development mode)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// SET EJS VIEW ENGINE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// SET STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')))

// ROUTES LISTS
// @desc    App Root Route
// @route   GET /
app.get('/', (req, res) => {
  res.render('root/index', { navTitle: 'Hello Paperon - Root' })
})
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