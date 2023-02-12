const express = require("express");
const multiparty = require("connect-multiparty");
const PostController = require("../controllers/post");
const md_auth = require("../middleware/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/blog" })
const api = express.Router();

api.post("/post", [md_auth.ensureAuth, md_upload], PostController.createPost);
api.patch("/update-post", [md_auth.ensureAuth, md_upload], PostController.updatePost);
api.delete("/delete-post", [md_auth.ensureAuth], PostController.deletePost)
api.get("/get-post", [md_auth.ensureAuth], PostController.getPost);
api.get("/posts", PostController.getPosts);

module.exports = api;