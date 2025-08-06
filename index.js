const express = require("express")
const { connectDb } = require("./config/connectDB")
const app = express()
const userrouter = require("./routes/userBloge")
const blogRouter = require("./routes/blogRoutes")
const aggregateRouter = require("./routes/aggregation")
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT

//express middelwares
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

//All routes
app.use("/auth", userrouter)
app.use("/blog",blogRouter)


//routes for aggregationFunction
app.use("/aggregation",aggregateRouter)


connectDb().then(()=>{
    app.listen(port,()=>{
    console.log("db connected on port 5001")
})
})



