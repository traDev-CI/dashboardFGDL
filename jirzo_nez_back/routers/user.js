const express = require("express");
const userController = require("../controllers/user");
const multipart = require("connect-multiparty");
const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multipart({ uploadDir: "./upload/avatar" });

const api = express.Router();

api.post("/sign-up", userController.signUp);
api.post("/sign-in", userController.signIn);
api.get("/users", [md_auth.ensureAuth], userController.getUsers);
api.put("/update-user/:id", [md_auth.ensureAuth], userController.updateUser);
api.get("/users-active", [md_auth.ensureAuth], userController.getUsersActive);
api.put(
  "/upload-avatar/:id",
  [md_auth.ensureAuth, md_upload_avatar],
  userController.uploadAvatar
);
api.get("/get-avatar/:avatarName", userController.getAvatar);
api.put(
  "/activate-user/:id",
  [md_auth.ensureAuth],
  userController.activateUser
);
api.delete("/delete-user/:id", [md_auth.ensureAuth], userController.deletUser);
api.post("/sign-up-admin/", [md_auth.ensureAuth], userController.signUpAdmin);
api.post("/create-user", [md_auth.ensureAuth, md_upload_avatar], userController.createUser);

module.exports = api;
