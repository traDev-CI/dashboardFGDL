const Image = require("../models/images");
const fs = require("fs");
const path = require("path");
const user = require("../models/user");

const uploadDataImage = (req, res) => {
  const image = new Image();
  const { photograper, model, type, nameSection, active } = req.body;
  image.photograper = photograper;
  image.model = model;
  image.type = type;
  image.nameSection = nameSection;
  image.active = active;

  image.save((err, imageStored) => {
    if (err) {
      res.status(500).send({ message: "Esta imagen ya esta almacenada" });
    } else {
      if (!imageStored) {
        res.status(500).send({ message: "Error al almacenar la imagen" });
      } else {
        res.status(200).send({ image: imageStored });
      }
    }
  });
};

const uploadImage = (req, res) => {
  const params = req.params;
  Image.findById({ _id: params.id }, (err, imageData) => {
    if (err) {
      res.status(500).send({ message: "Error del server" });
    } else {
      if (!imageData) {
        res.status(404).send({ message: "La imagen no existe" });
      } else {
        let img = imageData;
        if (req.files) {
          let filePath = req.files.image.path;
          let fileSplit = filePath.split(`\\`);
          let fileName = fileSplit[2];
          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message:
                "La extencion de la imagen no es la correcta ( Extenciones correctas: png, jpg, jpeg )"
            });
          } else {
            img.image = fileName;
            Image.findByIdAndUpdate(
              { _id: params.id },
              img,
              (err, imageResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor" });
                } else {
                  if (!imageResult) {
                    res.status(404).send({ message: "Imagen no encontrada" });
                  } else {
                    res.status(200).send({ image: imageResult });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
};

const getImage = (req, res) => {
  const imageName = req.params.imageName;
  const filePath = "./upload/images/" + imageName;

  fs.exists(filePath, (exists) => {
    if (!exists) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

const getDataImage = (req, res) => {
  Image.find().then((images) => {
    if (!images) {
      res.status(500).send({ message: "No hay ninguna imagen" });
    } else {
      res.status(200).send({ images });
    }
  });
};

const deleteImage = (req, res) => {
  const { id } = req.params;
  Image.findByIdAndRemove(id, (err, imageDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (!imageDeleted) {
        res.status(404).send({ message: "Imagen no encontrada" });
      } else {
        res.status(200).send({ message: "Imagen Borrada" });
      }
    }
  });
};

const updateDataImage = (req, res) => {
  let imageData = req.body;
  const params = req.params;

  Image.findByIdAndUpdate(
    { _id: params.id },
    imageData,
    (err, imageUpdated) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (!imageUpdated) {
          res.status(404).send({ message: "Imagen no encontrada" });
        } else {
          res.status(200).send({ message: "Imagen actualizada" });
        }
      }
    }
  );
};

module.exports = {
  uploadDataImage,
  uploadImage,
  getImage,
  deleteImage,
  getDataImage,
  updateDataImage
};
