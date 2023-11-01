const express=require("express");

const router=express.Router();

const Controller=require("../controllers/index");

// router.get("/sign_in",Controller.signIn);

router.get("/sign_up",Controller.signUp);

router.post("/createUser",Controller.createUser);

router.get("/createSession",Controller.createSession);

router.get("/buyNow",Controller.buyNow);

router.post("/search",Controller.search);

router.get("/backUserSession",Controller.backUserSession);

module.exports=router;