const mongoose = require("mongoose")


const blogSchema =new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categeries:{
        type:String,
        default:"All"
    },
    content: {
        type: String,
        required: true,
 
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"

    },
    blogImage:String,
    authorName:String

}, { timestamps: true })
module.exports = mongoose.model("userBlog", blogSchema)