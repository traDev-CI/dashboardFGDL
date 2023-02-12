const express = require("express");
const menuController = require("../controllers/menu");
const multipart = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");

const api = express.Router();

api.post("/app-menu", [md_auth.ensureAuth], menuController.addMenu);
api.get("/get-menu", [md_auth.ensureAuth], menuController.getMenus);
api.patch("/update-menu/:id", [md_auth.ensureAuth], menuController.updateMenuById);
api.delete("/delete-menu/:id", [md_auth.ensureAuth], menuController.deleteMenu);

module.exports = api;
