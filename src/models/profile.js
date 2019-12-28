// import
const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

// init
const Schema = mongoose.Schema;

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
    ref: "Member",
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
});

// create model
profileSchema.plugin(autopopulate); // autopopulate
const model = mongoose.model("Profile", profileSchema);

module.exports = model;
