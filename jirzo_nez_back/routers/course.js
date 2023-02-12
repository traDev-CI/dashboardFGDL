const express = require("express");
const courseController = require("../controllers/course");
const multiparty = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");
const md_upload_auth = multiparty({ uploadDir: "./upload/course" });

const api = express.Router();

api.post("/course", [md_auth.ensureAuth, md_upload_auth], courseController.createCourse);
api.patch("/update-course", [md_auth.ensureAuth, md_upload_auth], courseController.updateCourse);
api.delete("/delete-course", [md_auth.ensureAuth], courseController.deleteCourse);
api.get("/courses", courseController.getCourses);

module.exports = api;