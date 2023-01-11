"use strict";

var jwt = require("jwt-simple");

var moment = require("moment");

var SECRET_KEY = "87yte639203e892D6HR#89473AjhR987512kdfsDFGQPA";

var createAccessToken = function createAccessToken(user) {
  var payload = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    role: user.role,
    createToken: moment().unix(),
    exp: moment().add(3, "hours").unix()
  };
  return jwt.encode(payload, SECRET_KEY);
};

var createRefreshAccessToken = function createRefreshAccessToken(user) {
  var payload = {
    id: user._id,
    exp: moment().add(30, "days").unix()
  };
  return jwt.encode(payload, SECRET_KEY);
};

var decodeToken = function decodeToken(token) {
  return jwt.decode(token, SECRET_KEY, true);
};

module.exports = {
  createAccessToken: createAccessToken,
  createRefreshAccessToken: createRefreshAccessToken,
  decodeToken: decodeToken
};