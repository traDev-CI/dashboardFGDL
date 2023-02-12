const Menu = require("../models/menu");

const addMenu = (req, res) => {
  const { title, url, order, active } = req.body;
  const menu = new Menu();
  Menu.title = title;
  Menu.url = url;
  Menu.order = order;
  Menu.active = active;

  Menu.save((err, createdMenu) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!createdMenu) res.status(404).send({ message: "Error al crear el menu. " });
      res.status(200).send({ message: "Menu creado correctamente." });
    }
  });
};

const getMenus =  (req, res) => {
   Menu.find()
    .sort({ order: "asc" })
    .exec((err, menus) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor" });
      } else {
        if (!menus) res.status(404).send({ message: "No existe ningun menu " });
          res.status(200).send({ menus });
      }
    });
};

const updateMenuById = async (req,res) => {
  const { id } = req.params;
  const menuData = req.body;

  Menu.findByIdAndUpdate({_id: id}, menuData, (err) => {
    if (err) {
      res.status(500).send({ message:  "Error del Servidor"})
    } else {
      if (!menuData) res.status(400).send({ message: "Error al actualizar el menu" });
      res.status(200).send({ message: "El menu se a actualizado" });
    }
  })
}

const deleteMenu = async (req, res) => {
  const { id } = req.params;
  Menu.findByIdAndDelete({_id: id}, menuDeleted, (err) => {
    if (err) {
      res.status(500).send(({ message: "Error del servidor" }));
    } else {
      if (!menuDeleted) res.status(400).send({ message: "Menu no encontrado" })
      res.status(200).send({ message: "El menu a sido borrado" })
    }
  })
}

module.exports = {
  addMenu,
  getMenus,
  updateMenuById,
  deleteMenu
};
