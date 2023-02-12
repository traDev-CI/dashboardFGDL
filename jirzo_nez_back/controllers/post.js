const Post = require("../models/post");
const image = require("../utils/processImage");

const createPost = (req, res) =>{

    const post = new Post(req.body)
    post.create_at = new Date();

    const imagePath = image.getFileName(req.files.miniature);
    post.miniature = imagePath;

    Post.save((err, postStored) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!postStored) res.status(400).send({ message: "Error al eliminar el post" })
            res.status(200).send({ message: "El post se publico satisfactoriamente" })
        }
    })
}

const getPost = (req, res) => {
    const { path } = req.params;
    Post.findOne({path}, (err, postFound) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!postFound) res.status(400).send({ message: "Error al obtener el post" })
            res.status(200).send({ postFound })
        }
    })
}

const getPosts = (req, res) => {
    const { page, limit } = req.query;
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { created_at: des }
    }

    Post.paginate({}, options, (err, postStored) =>{
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!postStored) res.status(400).send({ message: "Error al eliminar el post" })
            res.status(200).send({ postStored })
        }
    })

}

const updatePost = (req, res) => {
    const { id } = req.params;
    const postData = req.body;

    if(req.files.miniature){
        const imagePath = image.getFileName(req.files.miniature);
        postData.miniature = imagePath;
    }

    Post.findByIdAndUpdate({_id: id}, postData, (err) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!postStored) res.status(400).send({ message: "Error al actualizar el post" })
            res.status(200).send({ message: "El post se a actualizado satisfactoriamente" })
        }
    })
}

const deletePost = (req,res) =>{
    const { id } = req.params;
    Post.findByIdAndRemove({_id: id}, (err, deletedPost) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!deletedPost) res.status(400).send({ message: "Error al eliminar el post" })

            res.status(200).send({ message: "El post ha sido eliminado correctamente" })
        }
    })
}


module.exports= {createPost, getPosts, updatePost, deletePost, getPost};