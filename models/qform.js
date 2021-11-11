import mongoose from 'mongoose'

const QFromSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  qcode: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  desc: {
    type: String,
    trim: true
  },
  status: {
    type: String,
      default: 'draft',
      enum: ['publish', 'draft']
  },
  state: {
      type: String,
      default: 'public',
      enum: ['public', 'private', 'anon']
  },
  qbankArray: [],
  step: {
    type: Number,
    default: 0,
    enum: [0, 1, 2, 3]
  }
}, { timestamps: true })

export default mongoose.model('qform', QFromSchema)