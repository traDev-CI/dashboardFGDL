"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LayoutAdmin = _interopRequireDefault(require("../pages/layouts/LayoutAdmin"));

var _LayoutBasic = _interopRequireDefault(require("../pages/layouts/LayoutBasic"));

var _admin = _interopRequireDefault(require("../pages/admin"));

var _SignIn = _interopRequireDefault(require("../pages/admin/SignIn"));

var _Contact = _interopRequireDefault(require("../pages/Contact"));

var _Editorial = _interopRequireDefault(require("../pages/Editorial"));

var _Fantasy = _interopRequireDefault(require("../pages/Fantasy"));

var _Home = _interopRequireDefault(require("../pages/Home"));

var _Portrait = _interopRequireDefault(require("../pages/Portrait"));

var _Error404Admin = _interopRequireDefault(require("../pages/admin/Error404Admin"));

var _Error404Client = _interopRequireDefault(require("../pages/Error404Client"));

var _Users = _interopRequireDefault(require("../pages/admin/Users"));

var _MenuWeb = _interopRequireDefault(require("../components/admin/MenuWeb/MenuWeb"));

var _Images = _interopRequireDefault(require("../pages/admin/Images"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routesAdmin = [{
  path: "/admin",
  layout: _LayoutAdmin["default"],
  element: _admin["default"]
}, {
  path: "/admin/login",
  layout: _LayoutAdmin["default"],
  element: _SignIn["default"]
}, {
  path: "/admin/users",
  layout: _LayoutAdmin["default"],
  element: _Users["default"]
}, {
  path: "/admin/menu-web",
  layout: _LayoutAdmin["default"],
  element: _MenuWeb["default"]
}, {
  path: "/admin/gallery",
  layout: _LayoutAdmin["default"],
  element: _Images["default"]
}, {
  path: "/admin/*",
  layout: _LayoutAdmin["default"],
  element: _Error404Admin["default"]
}];
var routesClient = [{
  path: "/",
  layout: _LayoutBasic["default"],
  element: _Home["default"]
}, {
  path: "/portrait",
  layout: _LayoutBasic["default"],
  element: _Portrait["default"]
}, {
  path: "/editorial",
  layout: _LayoutBasic["default"],
  element: _Editorial["default"]
}, {
  path: "/fantasy",
  layout: _LayoutBasic["default"],
  element: _Fantasy["default"]
}, {
  path: "/contact",
  layout: _LayoutBasic["default"],
  element: _Contact["default"]
}, {
  path: "/*",
  layout: _LayoutBasic["default"],
  element: _Error404Client["default"]
}];
var routes = [].concat(routesAdmin, routesClient);
var _default = routes;
exports["default"] = _default;