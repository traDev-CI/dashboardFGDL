const express = require("express");
const multiparty = require("connect-multiparty");
const AboutController = require("../controllers/about");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({ uploadDir: "./upload/miniature" });
const api = express.Router();

api.post("/about", [md_auth.ensureAuth, md_upload], AboutController.createAbout);
api.put("/update-miniature/:id", [md_auth.ensureAuth, md_upload], AboutController.uploadMiniature);
api.get("/get-info-about", [md_auth.ensureAuth], AboutController.getAbout);
api.get("/get-miniature/:miniatureName", AboutController.getMiniature);
api.put("/update-about/:id", [md_auth.ensureAuth], AboutController.updateAbout);


module.exports = api;