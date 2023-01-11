const express = require("express");
const AuthController = require("../controllers/auth");

const api = express.Router();

api.post("/refresh-acces-token", AuthController.refreshAccessToken);

module.exports = api;
