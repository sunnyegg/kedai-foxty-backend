// import
const mongoose = require("mongoose");

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
  memberID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Member"
    }
  ]
});

// create model
const model = mongoose.model("Profile", profileSchema);

module.exports = model;
