"use strict";

var express = require("express");

var menuController = require("../controllers/menu");

var multipart = require("connect-multiparty");

var md_auth = require("../middleware/authenticated");

var md_upload_avatar = multipart({
  uploadDir: "./upload/avatar"
});
var api = express.Router();
api.post("/app-menu", [md_auth.ensureAuth], menuController.addMenu);
api.get("/get-menu", [md_auth.ensureAuth], menuController.getMenus);
module.exports = api;