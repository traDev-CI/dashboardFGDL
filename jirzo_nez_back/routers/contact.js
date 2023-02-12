const express = require("express");
const ContactController = require("../controllers/contact");
const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/contact", ContactController.sendMessage);
api.delete("/delete-contact", [md_auth.ensureAuth], ContactController.deleteMessage);

module.exports = api;
