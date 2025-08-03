const express = require("express")
const { createBlog, getBlogs, getBlogsById ,updateBlogs, deletBlogs, upload, getcomments, addcomments, deletecomments} = require("../controller/userBlogs")
const { authCheck } = require("../middelware/authCheck")
const { addLike } = require("../controller/userLikes")




const router = express.Router()





//routes for crud operations
router.post("/post",authCheck,upload.single("file"), createBlog)
router.get("/get",getBlogs)
router.get("/getbyid/:id", getBlogsById)
router.put("/update/:id",authCheck,upload.single("file"),updateBlogs)
router.delete("/delet/:id",authCheck,deletBlogs)

//routes for comments
router.get("/comments/:id",authCheck,getcomments)
router.post("/addcomments/:id",authCheck,addcomments)
router.delete("/deletcomments/:blogid/:id",authCheck,deletecomments)

//routes for likes
router.put("/put/:id",authCheck,addLike)
module.exports = router