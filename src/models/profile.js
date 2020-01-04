// import
import { Schema, model } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

// create schema
const profileSchema = new Schema({
  avatar: {
    type: String,
    required: false
  },
  status: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  nickname: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: false
  },
  memberID: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    autopopulate: true
  },
  createdAt: {
    type: Date,
    required: false,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    required: false,
    default: new Date()
  }
})

// autopopulate
profileSchema.plugin(autopopulate)

// create model
const createModel = model('Profile', profileSchema)

export default createModel
