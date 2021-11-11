const mongoose = require('mongoose')

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

const Result = mongoose.model('result', ResultSchema)
module.exports = Result