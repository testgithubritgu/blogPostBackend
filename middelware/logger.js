const userModel  = require("../model/user")
const historymodel = require("../model/history")

exports.logger = async (req,res,next)=>{

    const date = new Date()

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
      const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    let time = `${date.getHours()} `
    const ampm = time<12?"AM":"PM"
      const logHistory = {
        visitedURL:visiturl,
        date:date.getDate(),
   
        minAndHr: `${(time%12 || 12).toString().padStart(2,0)}:${(date.getMinutes()).toString().padStart(2,0)} ${ampm}`,
        year:date.getFullYear(),
        day:days[date.getDay()]
        
      }

      if(!historymodelfind){
            const createhistory = await historymodel.create({
                history:[[logHistory]],
            author:id
        })
            
    
        
    }else{
    
        const lastGroup = historymodelfind.history[0]
        const lastEntry = lastGroup[0]
      
        if(lastEntry?.date === date.getDate()){
            lastGroup.unshift(logHistory)
        }else{
            historymodelfind.history.unshift([logHistory])
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
        res.status(404).json({message:"no history found",err:error})
    }   
}