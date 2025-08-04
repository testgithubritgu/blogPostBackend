const userModel  = require("../model/user")
const historymodel = require("../model/history")

exports.logger = async (req,res,next)=>{

    const date = new Date()
    console.log(date.getDay(),date.getFullYear(),date.getMinutes(),date.getMonth()+1)
    const {id} =req.user
    const visiturl =  req.body.requrl
    try {
      let historymodelfind =await historymodel.findOne({author:id})
      const days =[
        "sunday",
        "monday",
        "tuesday",
        "wensday",
        "thursday",
        "friday",
        "saturday"
      ]
      const logHistory = {
        visitedURL:visiturl,
        date:date.getDate(),
        minAndHr: `${date.getHours()}:${date.getMinutes()}`,
        year:date.getFullYear(),
        day:days[date.getDay()]
        
      }
      if(!historymodelfind){
            const createhistory = await historymodel.create({
                history:[[logHistory]],
            author:id
        })
            
    
        
    }else{
    
        const lastGroup = historymodelfind.history.at(-1)
        const lastEntry = lastGroup?.at(-1)
        if(lastEntry?.date === date.getDate()){
            lastGroup.push(logHistory)
        }else{
            historymodelfind.history.push([logHistory])
        }
        await historymodelfind.save()
     
                // const findhistory = await historymodel.findOne({author:id})
        // const idx = findhistory.history.length
        // if (findhistory.history[idx-1][findhistory.history[idx-1].length-1].date === date.getDate()){

        //     findhistory.history[idx-1].push(logHistory)
            
        //     await findhistory.save()
        //     console.log(findhistory)
        // }else{
        //     findhistory.history.push([logHistory]) 
        //     await findhistory.save()
        // }

      
      }
      next()
    } catch (error) {
        console.log("sdf")
    }   
}