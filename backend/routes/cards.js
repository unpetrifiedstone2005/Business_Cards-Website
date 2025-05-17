const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {Cards, User} = require("../db");
const zod = require("zod");
const authmiddleware = require("../middlewares/authmiddleware");

const app = express();

app.use(authmiddleware);

const addCards = zod.object({
  bname: zod.string(),
  designation: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  contact: zod.number(),
  webname: zod.string(),
  address: zod.string(),
})

app.post("/add", async (req,res) => {

   const {success} = addCards.safeParse(req.body);
   if(!success){
    return res.status(411).json({
      msg: "incorrect schema"
    })
   }

   
   const user = jwt.verify(req.headers.authorization.split(' ')[1],JWT_SECRET);
   const userId = user._id;
   try{

    const {firstName, lastName} = await User.findOne({_id: userId}, "firstName lastName");
      await Cards.create({
          bname: req.body.bname,
          designation: req.body.designation,
          firstName: firstName,
          lastName: lastName,
          contact: req.body.contact,
          webname: req.body.webname,
          address: req.body.address
   })

   return res.status(200).json({msg: "New card successfully created"})

   }catch(err){
    return res.status(411).json({msg: err})
   }
});

const updateCards = zod.object({
  ogbname: zod.string(),
  bname: zod.string().optional(),
  designation: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  contact: zod.number().optional(),
  webname: zod.string().optional(),
  address: zod.string().optional(),
})

app.put("/update", async(req,res)=>{
    const {success} = updateCards.safeParse(req.body);
    if(!success){
      return res.status(411).json({msg: "incorrect input schema"});
    }

    try{
      await Cards.updateOne(
        {ogbname: req.body.ogbname},
        {$set:{
          bname: zod.string(),
          designation: zod.string(),
          firstName: zod.string(),
          lastName: zod.string(),
          contact: zod.number(),
          webname: zod.string(),
          address: zod.string(),
        }}
      )
      return res.status(200).json({msg: "card updated succesfully"})
    }catch(err){
      return res.status(411).json({msg: err})
    }
})

app.put("/delete/:id", async(req,res)=>{

    try{
      const id = req.params.id;

      await Cards.findByIdAndDelete({_id: id});
      return res.status(200).json({msg: "Card deleted succesfully"})
    }
    catch(err){
      return res.json({msg: err})
    }

})

app.get("/get", async(res,res)=>{
  const user = jwt.verify(req.headers.authorization.split(' ')[1], JWT_SECRET);
  const userId = user._id;

  const found = await User.findById({_id: userId});

  if(!found) return res.status(411).json({msg: "User not found"})

  const cardarr = await Cards.findMany({firstName: found.firstName});

  return res.status(200).json({
    msg: "successfully retrieved",
    arr: cardarr
  })


})
module.exports = router