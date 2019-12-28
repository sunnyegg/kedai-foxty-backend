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
  memberID: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    autopopulate: true
  }
});

// create model
profileSchema.plugin(autopopulate); // autopopulate
const model = mongoose.model("Profile", profileSchema);

module.exports = model;
