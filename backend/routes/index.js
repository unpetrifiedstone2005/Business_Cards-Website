const express = require("express");
const userRouter = require("./user");
const cardsRouter = require("./cards");
const router = express.Router();

router.use("./user",userRouter);
router.use("./cards",cardsRouter);


module.exports= router;

