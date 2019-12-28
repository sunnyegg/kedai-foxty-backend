// import
const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

// init
const Schema = mongoose.Schema;

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
    ref: "Profile",
    autopopulate: true
  }
});

// create model
memberSchema.plugin(autopopulate); // autopopulate
const model = mongoose.model("Member", memberSchema);

module.exports = model;
