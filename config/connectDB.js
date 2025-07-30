const mongoose = require("mongoose")
exports.connectDb = async ()=>{
    await mongoose.connect(`${process.env.MONGODB_CONNECTION}/userPost`)
    console.log("db connected")
}