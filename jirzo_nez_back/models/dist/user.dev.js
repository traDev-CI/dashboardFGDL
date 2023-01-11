"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var UserSchema = Schema({
  name: String,
  lastname: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  active: Boolean
});
module.exports = mongoose.model("User", UserSchema);