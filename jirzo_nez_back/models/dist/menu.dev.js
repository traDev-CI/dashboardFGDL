"use strict";

var moongose = require("mongoose");

var Schema = moongose.Schema;
var MenuSchema = Schema({
  title: String,
  url: String,
  order: Number,
  active: Boolean
});
module.exports = moongose.model("Menu", MenuSchema);