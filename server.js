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
app.get('/', (req,res) => {
  res.json('Hello Paperon')
})

// CONNECT TO DB
connectDB()

// SERVER START
app.listen(PORT, HOST, () => {
  console.log(`Server Running on: http://${HOST}:${PORT}`)
})