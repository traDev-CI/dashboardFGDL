const express = require("express");
const menuController = require("../controllers/menu");
const multipart = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multipart({ uploadDir: "./upload/avatar" });
const api = express.Router();

api.post("/app-menu", [md_auth.ensureAuth], menuController.addMenu);
api.get("/get-menu", [md_auth.ensureAuth], menuController.getMenus);

module.exports = api;
