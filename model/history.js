const mongoose = require("mongoose")

const usersHistorySchema = new mongoose.Schema({
        
       history:{
        type:[[{
            visitedURL: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
    minAndHr: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    day: {
      type: String,
      required: true
    }
  
        }]],
        default:[]
       },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
})

module.exports = mongoose.model("history",usersHistorySchema)