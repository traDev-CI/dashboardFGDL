const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AboutSchema = Schema({
    title: String,
    description: String,
    miniature: String,
});

module.exports = mongoose.model("About", AboutSchema);