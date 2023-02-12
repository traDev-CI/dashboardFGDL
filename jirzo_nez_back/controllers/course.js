const course = require("../models/course");
const image = require("../utils/processImage")

const createCourse =  (req, res) => {
    const course = new course(req.body);
    const imagePath = image.getFileName(req.fiels.miniature);
    course.miniature = imagePath;

    course.save((err, courseStored) =>{
        if (err) {
            res.status(500).send({ message: "error del servidor" })
        } else {
            if(!courseStored) res.status(400).send({ message: "Error al crear el curso" })

            res.status(200).send({ message: "Curso creado satisfactoriamente", courseStored })
        }
    })

}

const getCourses = (req, res) =>{
    const {page = 1, limit = 10} = req.query;

    const  options = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

    course.paginate({}, options, (err, courses) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!courses)   res.status(400).send({ message: "Error al obtener los cursos" });

            res.status(200).send(courses)
          
        }
    })
}

const updateCourse = (req, res) => {
    const { id } = req.params;
    const courseData = req.body;

    if (req.file.miniature) {
        const imagePath = image.getFileName(req.file.miniature);
        courseData.miniature = imagePath;
    }

    course.findByIdAndUpdate({_id: id}, courseData, (err) => {
        if (err) {
            res.status(500).send({ message: "Error al actualizar los datos" })            
        } else {
            if(!courseData) res.status(400).send({ message: "Hay un error en los datos, vuelve a intentar" })

            res.status(200).send({ message: "El curso se ha actualizado correctamente" })
        }
    })

}

const deleteCourse = (req, res) => {
    const { id } = req.params;
    course.findByIdAndRemove({_id: id}, (err, courseDeleted) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if(!courseDeleted) res.status(400).send({ message: "Error al eliminar el curso" })

            res.status(200).send({ message: "El curso ha sido eliminado correctamente" })
        }
    })
}




module.exports ={createCourse, getCourses, updateCourse, deleteCourse};