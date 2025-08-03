const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type:String,
        default:"user"
    },
     myBlogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userBlog"
    }]

}, { timestamps: true })
module.exports = mongoose.model("user", userSchema)