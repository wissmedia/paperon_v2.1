// IMPORT DEPENDENCIES AND REQUIRED FILE
const express = require('express')

// CREATE EXPRESS APP
const app = express()
const PORT = process.env.PORT || 2021
const HOST = process.env.HOST || 'pcku.com'

// ROUTES LISTS
app.get('/', (req,res) => {
  res.json('Hello Paperon')
})

app.listen(PORT, HOST, () => {
  console.log(`Server Running on: http://${HOST}:${PORT}`)
})