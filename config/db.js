const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://paperon:paperon@homelab.local:27018/paperon_v2-1')
    console.log(`MongoDB Connected at: ${conn.connection.host}:${conn.connection.port}/${conn.connection.name}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB