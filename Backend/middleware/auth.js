const jwt = require("jsonwebtoken")

module.exports= async(req,res,next)=>{
     let token = req.headers?.authorization.split(" ")[1]
     if(token){
       const decoded = jwt.verify(token,"MangalYaan")
       if(decoded){
         next()
       }else{
        res.status(200).send({"msg":"Invalid Token"})
       }
     }else{
        res.status(200).send({"msg":"Please Login first"})
     }
}
