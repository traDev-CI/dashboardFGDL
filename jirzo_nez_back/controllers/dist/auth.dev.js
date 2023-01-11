"use strict";

var jwt = require("../services/jwt");

var moment = require("moment");

var User = require("../models/user");

var willExpireToken = function willExpireToken(token) {
  var _jwt$decodeToken = jwt.decodeToken(token),
      exp = _jwt$decodeToken.exp;

  var currentDate = moment().unix();

  if (currentDate > exp) {
    return true;
  }

  return false;
};

var refreshAccessToken = function refreshAccessToken(req, res) {
  var refreshToken = req.body.refreshToken;
  var isTokenExpire = willExpireToken(refreshToken);

  if (isTokenExpire) {
    res.status(404).send({
      message: "Refresh Token has expired"
    });
  } else {
    var _jwt$decodeToken2 = jwt.decodeToken(refreshToken),
        id = _jwt$decodeToken2.id;

    User.findOne({
      _id: id
    }, function (err, userStored) {
      if (err) {
        res.status(500).send({
          message: "Server error"
        });
      } else {
        if (!userStored) {
          res.status(404).send({
            message: "User not found"
          });
        } else {
          res.status(200).send({
            accessToken: jwt.createAccessToken(userStored),
            refresToken: refreshToken,
            message: "User founded"
          });
        }
      }
    });
  }
};

module.exports = {
  refreshAccessToken: refreshAccessToken
};