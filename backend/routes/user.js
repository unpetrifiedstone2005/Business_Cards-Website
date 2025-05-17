const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {User} = require("../db");
const JWT_SECRET =  require("../config");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

const app = express();

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
    lastName: body.lastName
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

router.post("/signin", async (req,res) => {
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


const updatedSchema = zod.object({
  ogusername: zod.string(),
  username: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional()
})

router.put("/update", authmiddleware, async(req, res) => {
  
  const {success} = updatedSchema.safeParse(req.body);

  if(!success){
    return res.status(411).json({
      msg: "incorrrect schema inputted"
    })
  }

  await User.updateOne(
    { username: req.body.ogusername},
    {$set: {
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }}
  )

  return res.status(200).json({msg:"updated successfully"});
  
})

module.exports =  router;