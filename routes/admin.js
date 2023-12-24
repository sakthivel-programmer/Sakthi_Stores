// requring express
const express=require("express");
// calling router module
const router=express.Router();
// initialing controller
const Controller=require("../controllers/index");
// router for admin logon page
router.get("/adminLogon",Controller.adminLogon);
// router for create admin session
router.post("/createAdminSession",Controller.createAdminSession);
// router for render add product page
router.get("/addProduct",Controller.addProduct);
// router for create the product in DB
router.post("/createProduct",Controller.createProduct);
// router for back to admin page from add product page
router.get("/backAdminSession",Controller.backAdminSession);
// router for delete any particular product with id
router.get("/deleteProduct/:id",Controller.deleteProduct);
// router for adming sign out page
router.get("/signOut",Controller.signOut);
// router for post product id and field name 
router.get("/creatingCookies",Controller.creatingCookies);
// router for update changes into DB
router.post("/update",Controller.update);
// make router available
module.exports=router

