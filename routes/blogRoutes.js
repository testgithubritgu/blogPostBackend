const express = require("express")
const { createBlog, getBlogs, getBlogsById ,updateBlogs, deletBlogs, upload, getcomments, addcomments, deletecomments, AllUsersBlog, getBlogsByUserId} = require("../controller/userBlogs")
const { authCheck } = require("../middelware/authCheck")
const { addLike } = require("../controller/userLikes")
const { logger } = require("../middelware/logger")
const { gethistory } = require("../controller/userHistory")




const router = express.Router()





//routes for crud operations
router.post("/post",authCheck,upload.single("file"),logger, createBlog)
router.get("/get",getBlogs)
router.post("/getbyid/:id",authCheck,logger, getBlogsById)
router.put("/update/:id",authCheck,upload.single("file"),logger,updateBlogs)
router.delete("/delet/:id",authCheck,deletBlogs)

//routes for comments
router.get("/comments/:id",authCheck,getcomments)
router.post("/addcomments/:id",authCheck,logger,addcomments)
router.delete("/deletcomments/:blogid/:id",authCheck,deletecomments)

//routes for likes
router.put("/put/:id",authCheck,addLike)

//routes for history
router.get("/history/:id",gethistory)
router.post("/allroutes",authCheck,logger,(req,res)=>{
    return res.status(200).json({message:"ok"})
})

//routes for getBlogByUserId
router.post("/userblogs",authCheck,getBlogsByUserId)





module.exports = router