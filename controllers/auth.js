const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt");
const users=[];
exports.postSignup=(req,res,next)=>{
    const id=new Date().toISOString();
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const password=req.body.password;
    const gender=req.body.gender;
    const jobRole=req.body.jobRole;
    const department=req.body.department;
    const address=req.body.address;
    console.log(req.body)
    bcrypt.hash(password, 12)
    .then((hash)=>{
        const user={
            id:id,
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hash,
            gender:gender,
            jobRole:jobRole,
            department:department,
            address:address
        }
        jwt.sign(
            {
                id:id,
                firstName:firstName,
                lastName:lastName,
                email:email,
                jobRole:jobRole,
                department:department,
                address:address

            }
            , 'jkhdjkfhdskjfhjkds',{ expiresIn: '1h' }, (err, token)=>{
            if(err){
            return res.status(500).json({
                status:500,
                message:err
            })
         }
         const olduser=users.filter(u=>{
             return u.email===email;
         })
         if(olduser.length > 0 ){
            return res.status(201).json({
                status:201,
                message:'Email already exist',
            })
         }
         users.push(user);
         res.status(401).json({
            status:401,
            message:'User created successfully',
            data:{
                token:token
            }
        })
    });
      
    })
    .catch(err=>console.log(err));
}
exports.postLogin=(req,res,next)=>{
  const email=req.body.email;
  const password=req.body.password;
  const findUsers=users.filter(u=>{
      return u.email===email;
  })
  const user=findUsers[0];
  if(!user){
      return res.status(500).json({
          status:500,
          message:"invalid email or password"
      })
  }
  bcrypt.compare(password, user.password)
  .then((yes)=> {
   if(!yes){
    return res.status(500).json({
        status:500,
        message:"invalid email or password"
    })
   }
   jwt.sign(
       {
        id:user.id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        jobRole:user.jobRole,
        department:user.department,
        address:user.address
       }, 'jkhdjkfhdskjfhjkds',{ expiresIn: '1h' }, (err, token)=>{
    if(err){
    return res.status(500).json({
        status:500,
        message:"auth failed"
    })
 }
 res.status(201).json({
            status:200,
            message:'User is successfully logged in',
            data:{
                token:token
            }
       })
   });
  })
  .catch(error=>console.log(error));
}