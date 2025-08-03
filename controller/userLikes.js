const likeModel = require("../model/like")

exports.addLike = async (req,res)=>{
        const {id} = req.user
        
        const blogId =req.params.id
    try {
        
        const pushAuthor = await likeModel.findOneAndUpdate({blogId},{$addToSet:{authorDetails:id}})
        const findeLongth = await likeModel.findOne({blogId})
        const findlikeByBlogId = await likeModel.updateOne({blogId:blogId},{$set:{countLikes:findeLongth.authorDetails.length}})
  
        
   
        res.status(200).json({message:"added like",success:true,likes:findeLongth.countLikes})
    } catch (error) {
        res.status(404).json({message:"not found" ,success:false})
    }
      
}


 
