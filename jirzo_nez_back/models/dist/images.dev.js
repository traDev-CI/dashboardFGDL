"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ImagesShema = Schema({
  photograper: String,
  model: String,
  nameSection: String,
  type: String,
  image: String,
  active: Boolean
});
module.exports = mongoose.model("Image", ImagesShema);