"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var _require = require("./config"),
    API_VERSION = _require.API_VERSION;

var cors = require("cors");

var app = express(); // Load routing

var authRoutes = require("./routers/auth");

var userRoutes = require("./routers/user");

var menuRoutes = require("./routers/menu");

var imageRoutes = require("./routers/images");

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); //

app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "100mb",
  extended: true,
  parameterLimit: 100000
})); // Configure Header HTTP

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
}); // Router Basic

app.use("/api/".concat(API_VERSION), authRoutes);
app.use("/api/".concat(API_VERSION), userRoutes);
app.use("/api/".concat(API_VERSION), menuRoutes);
app.use("/api/".concat(API_VERSION), imageRoutes);
module.exports = app;