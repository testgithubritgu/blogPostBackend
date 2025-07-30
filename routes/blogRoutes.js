const express = require("express")
const { createBlog, getBlogs, getBlogsById ,updateBlogs, deletBlogs, upload} = require("../controller/userBlogs")
const { authCheck } = require("../middelware/authCheck")



const router = express.Router()






router.post("/post",authCheck,upload.single("file"), createBlog)
router.get("/get",getBlogs)
router.get("/getbyid/:id",getBlogsById)
router.put("/update/:id",authCheck,updateBlogs)
router.delete("/delet/:id",authCheck,deletBlogs)


module.exports = router