const About = require("../models/about");
const image = require("../utils/processImage");
const fs = require("fs");
const path = require("path");

const createAbout =(req, res) => {
    const about = new About();
    const {title, description} = req.body;
    about.title = title;
    about.description = description;

    about.save((err, aboutCreated) => {
        if (err) {
            res.status(500).send({ message: "Eror en el servidor" })
        } else {
            if(!aboutCreated) res.status(400).send({ message: "Ocurrio un error al crear el about" });
            res.status(200).send({ message: "Se ha creado el about correctamente" });
        }
    })
}



const getAbout = (req, res) => {
    About.find((err, about) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" })
        } else {
            if(!about) res.status(400).send({ message: "Ocurrio un error al crear el about" });
            res.status(200).send({ about});
        }
    })
}

const uploadMiniature = (req, res) => {
    const params = req.params;
    About.findById({ _id: params.id }, (err, infoData) => {
        if (err) {
            res.status(500).send({ message: "Server error" });
        } else {
            if(!infoData){
                 res.status.send({ message: "Info not found" });
                } else {
                    let info = infoData;
                    if (req.files) {
                        let imageName = image.getFileName(req.files.miniature);
                        info.miniature = imageName;
                        About.findByIdAndUpdate({_id: params.id}, info, (err, infoUpdated) => {
                            if (err) {
                                res.status(500).send({ message: "Server Error" });
                            } else {
                                if(!infoUpdated){
                                      res.status(404).send({ message: "Info not found" });
                                    } else {
                                        res.status(200).send({ info: infoUpdated });
                                    }
                                
                            }
                        })
                    }
                }

        }
    })
}

const updateAbout = (req,res) => {
    const { id } = req.params;
    const aboutData = req.body;

    About.findByIdAndUpdate({_id: id}, aboutData, (err) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!aboutData) res.status(400).send({ message: "Ocurrio un error al crear el about" });
            res.status(200).send({ message: "La informacionse ha actualizado"});
        }
    } )
}

const getMiniature = (req, res) => {
    const miniatureName = req.params.miniatureName;
    const filePath = "./upload/miniature/" + miniatureName;
    fs.exists(filePath, (exists) => {
        if (!exists) {
            res.status(404).send({ message: "La miniatura no existe" });
        } else {
            res.sendFile(path.resolve(filePath));
        }
    })
}


module.exports = {
    createAbout,
    getAbout,
    updateAbout,
    uploadMiniature,
    getMiniature
}