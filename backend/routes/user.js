const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User} = require("../db");
const JWT_SECRET =  require("../config");
const authmiddleware = require("./middlewares/authmiddleware");
const router = express.Router();

const app  = express();

const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string()
})

router.post("/signup", async (req,res) => {
 const body = req.body;
 const {success} = signupSchema.safeParse(body);

  if(!success){
    return res.status(411).json({
      message: "schema incorrect"
    })
  }

  const user = await User.findOne({
    username: body.username
  })

  if(user){
    return res.status(411).json({
      message: "Username already exists"
    })
  }

  const newUser = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.firstName
  })

  const userId = newUser._id;

  const token = jwt.sign({
    userId
  }, JWT_SECRET);


  return res.status(200).json({
    message: "User created successfully",
    token: token
  })
 
})


const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

app.post("/signin", async (req,res) => {
  const body = req.body;
  
  const {success} = signinSchema.safeParse(body);

  if(!success){
    res.status(411).json({
      message: "Incorrect schema"
    })
  }

  const user = await User.findOne({
    username: body.username,
    password: body.password,
  })
  
  if(!user){
    res.status(411).json({msg: "User doesn't exist"})
  }
  
  const token = jwt.sign({
    userId: user._id
  }, JWT_SECRET)

  return res.status(200).json({
    message: "User found successfully",
    token: token
  })
  
  
})

module.exports =  router;