// requiring express
const express=require("express");
// calling router module
const router=express.Router();
// initializing controller
const Controller=require("../controllers/index");
// router to render home as logon page
router.get("/",Controller.Logon);
// initializing admin router
router.use("/admin",require("./admin"));
// initialinzing user router
router.use("/user",require("./user"));
// make router available
module.exports=router;

