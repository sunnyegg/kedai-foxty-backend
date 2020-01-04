// import
import { Schema, model } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

// create schema
const memberSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  profileID: {
    type: Schema.Types.ObjectId,
    ref: 'Profile',
    autopopulate: true
  }
})

// autopopulate
memberSchema.plugin(autopopulate)

// create model
const createModel = model('Member', memberSchema)

export default createModel
