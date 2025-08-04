const historyModel = require("../model/history")

exports.gethistory = async(req,res)=>{
    const {id} = req.params
    try {
        const finduserhistory = await historyModel.findOne({author:id})
        if (!finduserhistory){
            return res.status(404).json({message:"no history" ,success:false})
        }
        res.status(200).json({message:"history found",success:true,history:finduserhistory.history})
    } catch (error) {
        res.status(500).json({message:"internal server error",success:false})
    }
}