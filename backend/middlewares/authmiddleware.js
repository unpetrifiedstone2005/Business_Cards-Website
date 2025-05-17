const jwt = require('jsonwebtoken');
const  JWT_SECRET  = require('../config');
 
const authmiddleware = (req,res,next)=>{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(411).json({msg:"incorrect auth"})

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();

  }catch(err){
    return res.status(411).json({
      error: err
    })
  }
}

module.exports = authmiddleware;

