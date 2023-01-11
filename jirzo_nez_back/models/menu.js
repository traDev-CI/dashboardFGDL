const moongose = require("mongoose");
const Schema = moongose.Schema;

const MenuSchema = Schema({
  title: String,
  url: String,
  order: Number,
  active: Boolean
});

module.exports = moongose.model("Menu", MenuSchema);
