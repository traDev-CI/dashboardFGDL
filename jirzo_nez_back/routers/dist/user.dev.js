"use strict";

var express = require("express");

var userController = require("../controllers/user");

var md_auth = require("../middleware/authenticated");

var api = express.Router();
api.post("/sign-up", userController.signUp);
api.post("/sign-in", userController.signIn);
api.get("/users", [md_auth.ensureAuth], userController.getUsers);
module.exports = api;