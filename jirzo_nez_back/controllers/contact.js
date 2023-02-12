const Contact = require("../models/contact");

const sendMessage = (req, res) =>{
    const messageData = new Contact(req.body)
    messageData.save((err, contactSent) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!contactSent) res.status(400).send({ message: "Error al mandar el mensaje" });
            res.status(200).send({ message: "Mensaje enviado satisfactoriamente" });
        }
    })
}

const getMessages = (req, res) =>{
    Contact.find((err, messagesFound) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!messagesFound) res.status(400).send({ message: "No se encontro ningun mensaje" });
            res.status(200).send({ messagesFound });
        }
    })
   
}

const deleteMessage = (req, res) => {
    const { id } = req.query;
    Contact.findByIdAndRemove({_id: id}, (err, messageDeleted) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" });
        } else {
            if (!messagesFound) res.status(400).send({ message: "No se encontro ningun mensaje" });
            res.status(200).send({ message: "Se ha eliminado el mensaje" });
        }
    })
}

module.exports = {
    sendMessage,
    getMessages,
    deleteMessage
}