const moongose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate")
const Schema = moongose.Schema;

const CourseSchema = Schema({
    title: String,
    miniature: String,
    description: String,
    url: String,
    price: Number,
    score: Number,
})
CourseSchema.plugin(mongoosePaginate);
module.exports = moongose.model("Course", CourseSchema);