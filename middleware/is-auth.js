
const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
 try{
        var token=req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,'jkhdjkfhdskjfhjkds');
        req.user=user;
 } 
 catch(err){
     res.status(500).json({
         status:500,
         message:"unauthorized access"
     })
 }
  next();
}
