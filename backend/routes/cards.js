const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {Cards, User} = require("../db");
const zod = require("zod");
const authmiddleware = require("../middlewares/authmiddleware");

const app = express();

router.use(authmiddleware);

const addCards = zod.object({
  bname: zod.string(),
  designation: zod.string(),
  contact: zod.number(),
  webname: zod.string(),
  address: zod.string(),
})

router.post("/add", async (req,res) => {

   const {success} = addCards.safeParse(req.body);
   if(!success){
    return res.status(411).json({
      msg: "incorrect schema",
      debug: req.body
    })
   }

   
   const user = jwt.verify(req.headers.authorization.split(' ')[1],JWT_SECRET);
   const userID = user.userId;
   try{

      const {firstName, lastName, email} = await User.findOne({_id: userID},  { firstName: 1, lastName: 1, email:1,  _id: 0 });
      const card = await Cards.create({
          userId: userID,
          bname: req.body.bname,
          designation: req.body.designation,
          firstName: firstName,
          lastName: lastName,
          contact: req.body.contact,
          email: email,
          webname: req.body.webname,
          address: req.body.address
   })

   return res.status(200).json({msg: "New card successfully created",
    card: card
   })

   }catch (err) {
    return res.status(411).json({msg: err.message});
  }
});

const updateCards = zod.object({
  bname: zod.string().optional(),
  designation: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
  contact: zod.number().optional(),
  webname: zod.string().optional(),
  address: zod.string().optional(),
})

router.put("/update", async(req,res)=>{
    const {success} = updateCards.safeParse(req.body);
    if(!success){
      return res.status(411).json({msg: "incorrect input schema"});
    }

    const user = jwt.verify(req.headers.authorization.split(' ')[1],JWT_SECRET);
    const userID = user.userId;

    try{
        await Cards.updateMany(
        {userId: userID},
        {$set: req.body}
      )
      return res.status(200).json({msg: "card updated succesfully"})
    }catch(err){
      return res.status(411).json({msg: err.message})
    }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const card = await Cards.findById(id);

    if (!card) {
      return res.status(404).json({ 
        message: "Card not found"
      });
    }

    

    const result = await Cards.deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      throw new Error("Deletion failed - no documents were deleted");
    }

    return res.status(200).json({
      message: "Card deleted successfully",
      deletedCard: {
        id: card._id,
        bname: card.bname
      }
    });

  } catch (err) {
    return res.status(411).json({  
      message: err.message});
  }
});

router.get("/get", async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.verify(token, JWT_SECRET);
    const userID = user.userId;

    const found = await User.findById(userID);
    if (!found) return res.status(411).json({ msg: "User not found" });

      const cardarr = await Cards.find({userId: userID});
      
   
    return res.status(200).json({
      msg: "successfully retrieved",
      arr: cardarr
    });
  } catch (err) {
    console.error("Error in /get:", err);
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router