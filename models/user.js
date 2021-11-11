import mongoose from 'mongoose'

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
}, { timestamps: true })

export default mongoose.model('user', UserSchema)