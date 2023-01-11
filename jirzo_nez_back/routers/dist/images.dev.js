"use strict";

var express = require("express");

var imageContoller = require("../controllers/image");

var multiparty = require("connect-multiparty");

var md_auth = require("../middleware/authenticated");

var md_upload_auth = multiparty({
  uploadDir: "./upload/images"
});
var api = express.Router();
api.post("/set-data-image", [md_auth.ensureAuth], imageContoller.uploadDataImage);
api.post("/upload-image/:id", [md_auth.ensureAuth, md_upload_auth], imageContoller.uploadImage);
api.get("/data-images", [md_auth.ensureAuth], imageContoller.getDataImage);
api.get("/get-mimage/:imageName", imageContoller.getImage);
api.put("/upload-data-image/:id", [md_auth.ensureAuth], imageContoller.updateDataImage);
api["delete"]("/delete-image/:id", [md_auth.ensureAuth], imageContoller.deleteImage);
module.exports = api;