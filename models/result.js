const mongoose = require('mongoose')

const ResultSchema = new mongoose.Schema({
  qformId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'qform'
  },
}, { timestamps: true })

const Result = mongoose.model('result', ResultSchema)
module.exports = Result