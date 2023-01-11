const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImagesShema = Schema({
  photograper: String,
  model: String,
  nameSection: String,
  type: String,
  image: String,
  active: Boolean
});

module.exports = mongoose.model("Image", ImagesShema);
