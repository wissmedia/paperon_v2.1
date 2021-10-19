// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')

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

// ROUTES LISTS
// @desc    App Root Route
// @route   GET /
app.get('/', (req,res) => {
  res.json('Hello Paperon - root')
})
// @desc    App Author Route
// @route   GET /author
app.get('/author', (req,res) => {
  res.json('Hello Paperon - author')
})
// @desc    App Responden Route
// @route   GET /responden
app.get('/responden', (req,res) => {
  res.json('Hello Paperon - responden')
})
// @desc    App Admin Route
// @route   GET /admin
app.get('/admin', (req,res) => {
  res.json('Hello Paperon - admin')
})

// CONNECT TO DB
connectDB()

// SERVER START
app.listen(PORT, HOST, () => {
  console.log(`Server Running on: http://${HOST}:${PORT}`)
})