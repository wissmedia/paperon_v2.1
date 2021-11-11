import mongoose from 'mongoose'

const ResultSchema = new mongoose.Schema({
  qformId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'qform'
  },
  respoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
}, { timestamps: true })

export default mongoose.model('result', ResultSchema)