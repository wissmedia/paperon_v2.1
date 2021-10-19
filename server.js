// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')

// LOAD DB CONFIG
const connectDB = require('./config/db')

// CREATE EXPRESS APP
const app = express()
const PORT = process.env.PORT || 2021
const HOST = process.env.HOST || 'pcku.com'

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