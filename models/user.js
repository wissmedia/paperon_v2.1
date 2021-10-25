const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  role: {
    type: String,
    default: 'respondent',
    enum: ['respondent', 'author']
  },
  apiKey: {
    inbound: {
      type: String,
      default: null
    },
    outbound: {
      type: String,
      default: null
    }
  }
}, { timestamps: true })

const Author = mongoose.model('user', UserSchema)
module.exports = Author