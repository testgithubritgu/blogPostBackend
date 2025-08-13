const likesModel  = require("../model/like")
const userModel = require("../model/user")
const blogModel = require("../model/blog")
const mongoose = require("mongoose")

exports.aggregationFunction = async(req,res)=>{
    const {id} = req.user
    // const getUserDetails = await blogModel.aggregate([{$lookup:{from:'users',localField:"author", foreignField:"_id" ,as:"dataa"
    // }}])
    const getUserDetails = await blogModel.aggregate([{$match:{author: new mongoose.Types.ObjectId(id)}},
        {$lookup:{
            from:"users",
            localField:"author",
            foreignField:"_id",
            as:"authorInfo"
        }},
      
        {$group:{_id:"$author",blogs:{$push:"$title"}
    
    }}])
    // console.log(getUserDetails[0]?.dataa)
   
    res.status(200).json({"message":"ok"})
}   
































// const getUserDetails = await blogModel.aggregate([
//   { $match: { author: id } },                     // 1. Get blogs written by the current user
//   {
//     $lookup: {                                     // 2. Join with "users" collection
//       from: "users",
//       localField: "author",
//       foreignField: "_id",
//       as: "authorInfo"
//     }
//   },
//   { $unwind: "$authorInfo" },                     // 3. Flatten the joined user info
//   {
//     $group: {                                      // 4. Group by author id
//       _id: "$author",
//       blogs: { $push: "$title" }                   // 5. Collect blog titles into an array
//     }
//   }
// ]);