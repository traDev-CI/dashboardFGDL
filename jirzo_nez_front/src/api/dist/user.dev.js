"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpAdminApi = exports.deletedUserApi = exports.activeUserAPi = exports.updateUserApi = exports.getAvatarApi = exports.uploadAvatarApi = exports.getuserActiveApi = exports.getuserApi = exports.singInApi = exports.signUpApi = void 0;

var _config = require("./config");

var signUpApi = function signUpApi(data) {
  var url, params, response, result;
  return regeneratorRuntime.async(function signUpApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/sign-up");
          params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context.sent;
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          result = _context.sent;

          if (!result.user) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", {
            ok: true,
            message: "User created successfully"
          });

        case 13:
          return _context.abrupt("return", {
            ok: false,
            message: result.message
          });

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", {
            ok: false,
            message: _context.t0.message
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 16]]);
};

exports.signUpApi = signUpApi;

var singInApi = function singInApi(data) {
  var url, params, response, result;
  return regeneratorRuntime.async(function singInApi$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/sign-in");
          params = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context2.sent;
          _context2.prev = 5;
          _context2.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          result = _context2.sent;
          return _context2.abrupt("return", result);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](5);
          return _context2.abrupt("return", _context2.t0.message);

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

exports.singInApi = singInApi;

var getuserApi = function getuserApi(token) {
  var url, params, response, result;
  return regeneratorRuntime.async(function getuserApi$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/users");
          params = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context3.sent;
          _context3.prev = 5;
          _context3.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          result = _context3.sent;
          return _context3.abrupt("return", result);

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](5);
          return _context3.abrupt("return", _context3.t0.message);

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

exports.getuserApi = getuserApi;

var getuserActiveApi = function getuserActiveApi(token, status) {
  var url, params, response, result;
  return regeneratorRuntime.async(function getuserActiveApi$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/users-active?active=").concat(status);
          params = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          };
          _context4.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context4.sent;
          _context4.prev = 5;
          _context4.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](5);
          return _context4.abrupt("return", _context4.t0.message);

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

exports.getuserActiveApi = getuserActiveApi;

var uploadAvatarApi = function uploadAvatarApi(token, avatar, userId) {
  var url, formData, params, response, result;
  return regeneratorRuntime.async(function uploadAvatarApi$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/upload-avatar/").concat(userId);
          formData = new FormData();
          formData.append("avatar", avatar, avatar.name);
          params = {
            method: "PUT",
            body: formData,
            headers: {
              Authorization: token
            }
          };
          _context5.next = 6;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 6:
          response = _context5.sent;
          _context5.prev = 7;
          _context5.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          result = _context5.sent;
          return _context5.abrupt("return", result);

        case 14:
          _context5.prev = 14;
          _context5.t0 = _context5["catch"](7);
          return _context5.abrupt("return", _context5.t0.message);

        case 17:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

exports.uploadAvatarApi = uploadAvatarApi;

var getAvatarApi = function getAvatarApi(avatarName) {
  var url, response, result;
  return regeneratorRuntime.async(function getAvatarApi$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/get-avatar/").concat(avatarName);
          _context6.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context6.sent;
          _context6.prev = 4;
          result = response.url;
          return _context6.abrupt("return", result);

        case 9:
          _context6.prev = 9;
          _context6.t0 = _context6["catch"](4);
          return _context6.abrupt("return", _context6.t0.message);

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[4, 9]]);
};

exports.getAvatarApi = getAvatarApi;

var updateUserApi = function updateUserApi(token, user, userId) {
  var url, params, response, result;
  return regeneratorRuntime.async(function updateUserApi$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/update-user/").concat(userId);
          params = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify(user)
          };
          _context7.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context7.sent;
          _context7.prev = 5;
          result = response.json();
          return _context7.abrupt("return", result);

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](5);
          return _context7.abrupt("return", _context7.t0.message);

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[5, 10]]);
};

exports.updateUserApi = updateUserApi;

var activeUserAPi = function activeUserAPi(token, userId, status) {
  var url, params, response, result;
  return regeneratorRuntime.async(function activeUserAPi$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/activate-user/").concat(userId);
          params = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify({
              active: status
            })
          };
          _context8.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context8.sent;
          _context8.prev = 5;
          result = response.json();
          return _context8.abrupt("return", result);

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](5);
          return _context8.abrupt("return", _context8.t0.message);

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[5, 10]]);
};

exports.activeUserAPi = activeUserAPi;

var deletedUserApi = function deletedUserApi(token, userId) {
  var url, params, response, result;
  return regeneratorRuntime.async(function deletedUserApi$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/delete-user/").concat(userId);
          params = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          };
          _context9.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context9.sent;
          _context9.prev = 5;
          result = response.json();
          return _context9.abrupt("return", result);

        case 10:
          _context9.prev = 10;
          _context9.t0 = _context9["catch"](5);
          return _context9.abrupt("return", _context9.t0.message);

        case 13:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[5, 10]]);
};

exports.deletedUserApi = deletedUserApi;

var signUpAdminApi = function signUpAdminApi(token, data) {
  var url, params, response, result;
  return regeneratorRuntime.async(function signUpAdminApi$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/sign-up-admin");
          params = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify(data)
          };
          _context10.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context10.sent;
          _context10.prev = 5;
          result = response.json();
          return _context10.abrupt("return", result);

        case 10:
          _context10.prev = 10;
          _context10.t0 = _context10["catch"](5);
          return _context10.abrupt("return", _context10.t0.message);

        case 13:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[5, 10]]);
};

exports.signUpAdminApi = signUpAdminApi;