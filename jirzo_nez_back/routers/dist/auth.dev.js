"use strict";

var express = require("express");

var AuthController = require("../controllers/auth");

var api = express.Router();
api.post("/refresh-acces-token", AuthController.refreshAccessToken);
module.exports = api;