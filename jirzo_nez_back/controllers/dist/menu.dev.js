"use strict";

var Menu = require("../models/menu");

var addMenu = function addMenu(req, res) {
  var _req$body = req.body,
      title = _req$body.title,
      url = _req$body.url,
      order = _req$body.order,
      active = _req$body.active;
  var menu = new Menu();
  menu.title = title;
  menu.url = url;
  menu.order = order;
  menu.active = active;
  menu.save(function (err, createdMenu) {
    if (err) {
      res.status(500).send({
        message: "Error del servidor"
      });
    } else {
      if (!createdMenu) {
        res.status(404).send({
          message: "Error al crear el menu. "
        });
      } else {
        res.status(200).send({
          message: "Menu creado correctamente."
        });
      }
    }
  });
};

var getMenus = function getMenus(req, res) {
  Menu.find().sort({
    order: "asc"
  }).exec(function (err, menus) {
    if (err) {
      res.status(500).send({
        message: "Error del servidor"
      });
    } else {
      if (!menus) {
        res.status(404).send({
          message: "No existningun menue "
        });
      } else {
        res.status(200).send({
          menus: menus
        });
      }
    }
  });
};

module.exports = {
  addMenu: addMenu,
  getMenus: getMenus
};