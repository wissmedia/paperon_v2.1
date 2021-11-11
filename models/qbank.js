import mongoose from 'mongoose'

const QBankSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  tipe: {
    type: String,
    required: true,
    trim: true
  },
  body: {
    type: String,
    required: true,
    trim: true
  },
  useWajib: {
    type: String,
    default: '',
    enum: ['on', '']
  },
  opsiy: [
    {
      type: String,
      default: ''
    }
  ],
  opsix: [
    {
      type: String,
      default: ''
    }
  ],
  sl: [Number],
  label: [String]
}, { timestamps: true })

export default mongoose.model('qbank', QBankSchema)