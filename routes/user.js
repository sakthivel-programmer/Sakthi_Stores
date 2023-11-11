// requiring express
const express=require("express");
// calling router module
const router=express.Router();
// initializing controller
const Controller=require("../controllers/index");
// router for user sign up
router.get("/sign_up",Controller.signUp);
// router for create user in the DB
router.post("/createUser",Controller.createUser);
// router for create user session 
router.post("/createSession",Controller.createSession);
// ṛouter for buy now option
router.get("/buyNow",Controller.buyNow);
// router for search option
router.post("/search",Controller.search);
// router for back to user space from buynow page
router.get("/backUserSession",Controller.backUserSession);
// make the router available
module.exports=router;