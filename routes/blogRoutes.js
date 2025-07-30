const express = require("express")
const { createBlog, getBlogs, getBlogsById ,updateBlogs, deletBlogs, upload, getcomments, addcomments} = require("../controller/userBlogs")
const { authCheck } = require("../middelware/authCheck")



const router = express.Router()






router.post("/post",authCheck,upload.single("file"), createBlog)
router.get("/get",getBlogs)
router.get("/getbyid/:id",getBlogsById)
router.put("/update/:id",authCheck,upload.single("file"),updateBlogs)
router.delete("/delet/:id",authCheck,deletBlogs)
router.get("/comments/:id",authCheck,getcomments)
router.post("/addcomments/:id",authCheck,addcomments)


module.exports = router