const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactShema = Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    message: String,
    read: Boolean
})

module.exports = mongoose.model("Contacto", ContactShema);