const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    countLikes:{
        type:Number,
        default:0
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
 

    },

    authorDetails:[
       {type:mongoose.Schema.Types.ObjectId,
        ref:"user"
       }
    ],
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userBlog",
        require:true
    }
},{timestamps:true})


module.exports = mongoose.model("likes",likeSchema)
