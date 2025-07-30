const blog = require("../model/blog")
const blogModel = require("../model/blog")
const userModel = require("../model/user")
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname
    cb(null,filename)
  }
})

exports.upload = multer({ storage: storage })

exports.createBlog = async (req, res) => {
    const { title, content } = req.body
    console.log(req.file)
    const author = req.user.id
    const user = await userModel.findById({_id:author})
    try {
        const newBloge = await blogModel.create({
            title, content, author,authorName:user.name,blogImage:req.file.filename

        })
        user.myBlogs.push(newBloge._id)
        await user.save()

        res.status(200).json({ message: "post created succesfully", success: true })

    } catch (error) {
        res.json({ err: error })
    }
}

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await blog.find({})
        res.status(200).json({blog:blogs})
    } catch (error) {
        res.status(500).json({ err: error })
    }
}
exports.getBlogsById = async (req, res) => {
    const { id } = req.params
    try {
        const blogs = await blog.findOne({ _id: id })
        res.status(200).json({blogs})
    } catch (error) {
        res.status(500).json({ err: error })
    }
}
exports.updateBlogs = async (req, res) => {
    const { id } = req.params 
    console.log(id)
    try {
        const blogs = await blog.findById({ _id: id })
      
        if (!blogs) {
           
            return res.status(404).json({ message: "not found", success: false })
        }
        // if (blogs.author !== req.user.id) {
        //     return res.status(401).json({ message: "unauthorized", success: false })
        // }
        blogs.title = req.body.title || blogs.title
        blogs.content = req.body.content || blogs.content
        blogs.blogImage = req.file.filename || blogs.blogImage
        await blogs.save()
       return  res.status(200).json({ message: "updated succesfully", success: true })
    } catch (error) {
        res.status(500).json({ err: error })
    }
}

exports.deletBlogs = async (req, res) => {
    const { id } = req.params
    try {
        await blog.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: "deleted succesfully", success: false })
} catch (error) {
        return res.status(404).json({ message: "not found", success: false })

    }
}


exports.getcomments  =async (req,res)=>{
    const name = req.user.name
    const getcomments = await blogModel.findById(req.params.id)
 
    try {
        res.status(200).json({message:"ok",comment:getcomments.comments,date:getcomments.Date})
    } catch (error) {
        res.status(404).json({message:"not found",})
    }
}


exports.addcomments  =async (req,res)=>{
    const name = req.user.name
    const {text} = req.body
  try {
      const getcomments = await blogModel.findById(req.params.id)
    console.log(getcomments)
     getcomments.comments.push({user:name,text})
     await getcomments.save()
    res.status(200).json({message:"ok",success:true})
  } catch (error) {
    res.status(404).json({"message":"not found", success:false})
  }
}