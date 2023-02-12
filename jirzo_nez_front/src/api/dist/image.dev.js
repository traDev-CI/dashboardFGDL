"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImageApi = exports.uploadImageApi = exports.newDataImageApi = exports.uploadImageDataApi = exports.getImagesApi = exports.getDataImagesApi = void 0;

var _config = require("./config");

var getDataImagesApi = function getDataImagesApi(token) {
  var url, params, response, result;
  return regeneratorRuntime.async(function getDataImagesApi$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/data-images");
          params = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
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
          return _context.abrupt("return", result);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          return _context.abrupt("return", _context.t0.message);

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
};

exports.getDataImagesApi = getDataImagesApi;

var getImagesApi = function getImagesApi(imageName) {
  var url, response, result;
  return regeneratorRuntime.async(function getImagesApi$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/get-mimage/").concat(imageName);
          _context2.next = 3;
          return regeneratorRuntime.awrap(fetch(url));

        case 3:
          response = _context2.sent;
          _context2.prev = 4;
          result = response.url;
          return _context2.abrupt("return", result);

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](4);
          return _context2.abrupt("return", _context2.t0.message);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[4, 9]]);
};

exports.getImagesApi = getImagesApi;

var uploadImageDataApi = function uploadImageDataApi(token, imageData, imageDataId) {
  var url, params, response, result;
  return regeneratorRuntime.async(function uploadImageDataApi$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/upload-data-image/").concat(imageDataId);
          params = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify(imageData)
          };
          _context3.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context3.sent;
          _context3.prev = 5;
          result = response.json();
          return _context3.abrupt("return", result);

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](5);
          return _context3.abrupt("return", _context3.t0.message);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[5, 10]]);
};

exports.uploadImageDataApi = uploadImageDataApi;

var uploadImageApi = function uploadImageApi(token, image, imageId) {
  var url, formData, params, response, result;
  return regeneratorRuntime.async(function uploadImageApi$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/upload-image/").concat(imageId);
          formData = new FormData();
          formData.append("image", image, image.name);
          params = {
            method: "POST",
            body: formData,
            headers: {
              Authorization: token
            }
          };
          _context4.next = 6;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 6:
          response = _context4.sent;
          _context4.prev = 7;
          _context4.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          result = _context4.sent;
          return _context4.abrupt("return", result);

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](7);
          return _context4.abrupt("return", _context4.t0.message);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[7, 14]]);
};

exports.uploadImageApi = uploadImageApi;

var newDataImageApi = function newDataImageApi(token, data) {
  var url, params, response, result;
  return regeneratorRuntime.async(function newDataImageApi$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/set-data-image");
          params = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            },
            body: JSON.stringify(data)
          };
          _context5.next = 7;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 7:
          response = _context5.sent;
          _context5.prev = 8;
          result = response.json();
          return _context5.abrupt("return", result);

        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](8);
          return _context5.abrupt("return", _context5.t0.message);

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[8, 13]]);
};

exports.newDataImageApi = newDataImageApi;

var deleteImageApi = function deleteImageApi(token, imageId) {
  var url, params, response, result;
  return regeneratorRuntime.async(function deleteImageApi$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          url = "".concat(_config.BASE_PATH, "/").concat(_config.API_VERSION, "/delete-image/").concat(imageId);
          params = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: token
            }
          };
          _context6.next = 4;
          return regeneratorRuntime.awrap(fetch(url, params));

        case 4:
          response = _context6.sent;
          _context6.prev = 5;
          result = response.json();
          return _context6.abrupt("return", result);

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](5);
          return _context6.abrupt("return", _context6.t0.message);

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[5, 10]]);
};

exports.deleteImageApi = deleteImageApi;