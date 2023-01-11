"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refreshAccessToken = exports.logout = exports.getRefreshToken = exports.getAccesToken = void 0;

var _config = require("./config");

var _constants = require("../utils/constants");

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAccesToken = function getAccesToken() {
  var accessToken = localStorage.getItem(_constants.ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
};

exports.getAccesToken = getAccesToken;

var getRefreshToken = function getRefreshToken() {
  var refreshToken = localStorage.getItem(_constants.REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null" || refreshToken === undefined) {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
};

exports.getRefreshToken = getRefreshToken;

var refreshAccessToken = function refreshAccessToken(refreshToken) {
  var url, bodyObj, params;
  return regeneratorRuntime.async(function refreshAccessToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/refresh-acces-token");
          console.log("====================================");
          console.log(refreshToken);
          console.log("====================================");
          bodyObj = {
            refreshToken: refreshToken
          };
          params = {
            method: "POST",
            body: JSON.stringify(bodyObj),
            headers: {
              "Content-type": "application/json"
            }
          };
          fetch(url, params).then(function (response) {
            if (response.status !== 200) {
              return null;
            }

            return response.json();
          }).then(function (result) {
            if (!result) {
              logout();
            } else {
              var accessToken = result.accessToken,
                  _refreshToken = result.refreshToken;
              localStorage.setItem(_constants.ACCESS_TOKEN, accessToken);
              localStorage.setItem(_constants.REFRESH_TOKEN, _refreshToken);
            }
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.refreshAccessToken = refreshAccessToken;

var logout = function logout() {
  localStorage.removeItem(_constants.ACCESS_TOKEN);
  localStorage.removeItem(_constants.REFRESH_TOKEN);
};

exports.logout = logout;

var willExpireToken = function willExpireToken(token) {
  var seconds = 60;
  var metaToekn = (0, _jwtDecode["default"])(token);
  var exp = metaToekn.exp;
  var now = (Date.now() + seconds) / 1000;
  return now > exp;
};