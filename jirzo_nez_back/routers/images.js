const express = require("express");
const imageContoller = require("../controllers/image");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");
const md_upload_auth = multiparty({ uploadDir: "./upload/images" });
const api = express.Router();

api.post(
  "/set-data-image",
  [md_auth.ensureAuth],
  imageContoller.uploadDataImage
);
api.post(
  "/upload-image/:id",
  [md_auth.ensureAuth, md_upload_auth],
  imageContoller.uploadImage
);
api.get("/data-images", [md_auth.ensureAuth], imageContoller.getDataImage);
api.get("/get-mimage/:imageName", imageContoller.getImage);
api.put(
  "/upload-data-image/:id",
  [md_auth.ensureAuth],
  imageContoller.updateDataImage
);
api.delete(
  "/delete-image/:id",
  [md_auth.ensureAuth],
  imageContoller.deleteImage
);

module.exports = api;
