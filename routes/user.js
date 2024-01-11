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
router.get("/createSession",Controller.createSession);
// ṛouter for buy now option
router.get("/buyNow",Controller.buyNow);
router.get("/add_to_cart",Controller.addToCart)
router.get("/open_cart",Controller.openCart)
router.get("/remove_from_cart/:item_id",Controller.removeFromCart)
router.post('/searching', Controller.searchingg);
// router for search option
// router.post("/search",Controller.search);
router.post("/detailed_view",Controller.detailedView);
// make the router available
module.exports=router;
