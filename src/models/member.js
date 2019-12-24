// import
const mongoose = require("mongoose");

// init
const Schema = mongoose.Schema;

// create schema
const memberSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profileID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Profile"
    }
  ]
});

// create model
const model = mongoose.model("Member", memberSchema);

module.exports = model;
