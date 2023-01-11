"use strict";

var Image = require("../models/images");

var fs = require("fs");

var path = require("path");

var user = require("../models/user");

var uploadDataImage = function uploadDataImage(req, res) {
  var image = new Image();
  var _req$body = req.body,
      photograper = _req$body.photograper,
      model = _req$body.model,
      type = _req$body.type,
      nameSection = _req$body.nameSection,
      active = _req$body.active;
  image.photograper = photograper;
  image.model = model;
  image.type = type;
  image.nameSection = nameSection;
  image.active = active;
  image.save(function (err, imageStored) {
    if (err) {
      res.status(500).send({
        message: "Esta imagen ya esta almacenada"
      });
    } else {
      if (!imageStored) {
        res.status(500).send({
          message: "Error al almacenar la imagen"
        });
      } else {
        res.status(200).send({
          image: imageStored
        });
      }
    }
  });
};

var uploadImage = function uploadImage(req, res) {
  var params = req.params;
  Image.findById({
    _id: params.id
  }, function (err, imageData) {
    if (err) {
      res.status(500).send({
        message: "Error del server"
      });
    } else {
      if (!imageData) {
        res.status(404).send({
          message: "La imagen no existe"
        });
      } else {
        var img = imageData;

        if (req.files) {
          var filePath = req.files.image.path;
          var fileSplit = filePath.split("\\");
          var fileName = fileSplit[2];
          var extSplit = fileName.split(".");
          var fileExt = extSplit[1];

          if (fileExt !== "jpg" && fileExt !== "png" && fileExt !== "jpeg") {
            res.status(400).send({
              message: "La extencion de la imagen no es la correcta ( Extenciones correctas: png, jpg, jpeg )"
            });
          } else {
            img.image = fileName;
            Image.findByIdAndUpdate({
              _id: params.id
            }, img, function (err, imageResult) {
              if (err) {
                res.status(500).send({
                  message: "Error del servidor"
                });
              } else {
                if (!imageResult) {
                  res.status(404).send({
                    message: "Imagen no encontrada"
                  });
                } else {
                  res.status(200).send({
                    image: imageResult
                  });
                }
              }
            });
          }
        }
      }
    }
  });
};

var getImage = function getImage(req, res) {
  var imageName = req.params.imageName;
  var filePath = "./upload/images/" + imageName;
  fs.exists(filePath, function (exists) {
    if (!exists) {
      res.status(500).send({
        message: "Error en el servidor"
      });
    } else {
      res.sendFile(path.resolve(filePath));
    }
  });
};

var getDataImage = function getDataImage(req, res) {
  Image.find().then(function (images) {
    if (!images) {
      res.status(500).send({
        message: "No hay ninguna imagen"
      });
    } else {
      res.status(200).send({
        images: images
      });
    }
  });
};

var deleteImage = function deleteImage(req, res) {
  var id = req.params.id;
  Image.findByIdAndRemove(id, function (err, imageDeleted) {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor"
      });
    } else {
      if (!imageDeleted) {
        res.status(404).send({
          message: "Imagen no encontrada"
        });
      } else {
        res.status(200).send({
          message: "Imagen Borrada"
        });
      }
    }
  });
};

var updateDataImage = function updateDataImage(req, res) {
  var imageData = req.body;
  var params = req.params;
  Image.findByIdAndUpdate({
    _id: params.id
  }, imageData, function (err, imageUpdated) {
    if (err) {
      res.status(500).send({
        message: "Error en el servidor"
      });
    } else {
      if (!imageUpdated) {
        res.status(404).send({
          message: "Imagen no encontrada"
        });
      } else {
        res.status(200).send({
          message: "Imagen actualizada"
        });
      }
    }
  });
};

module.exports = {
  uploadDataImage: uploadDataImage,
  uploadImage: uploadImage,
  getImage: getImage,
  deleteImage: deleteImage,
  getDataImage: getDataImage,
  updateDataImage: updateDataImage
};