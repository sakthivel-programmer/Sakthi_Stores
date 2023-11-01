const express=require("express");
const router=express.Router();
const Controller=require("../controllers/index");

router.get("/",Controller.Logon);

router.use("/admin",require("./admin"));

router.use("/user",require("./user"));

module.exports=router;

