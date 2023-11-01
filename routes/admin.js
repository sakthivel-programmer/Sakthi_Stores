const express=require("express");

const router=express.Router();

const Controller=require("../controllers/index");

router.get("/adminLogon",Controller.adminLogon);

router.post("/createAdminSession",Controller.createAdminSession);

router.get("/createAdminSession",Controller.createAdminSession);

router.get("/addProduct",Controller.addProduct);

router.post("/createProduct",Controller.createProduct);

router.get("/backAdminSession",Controller.backAdminSession);

router.get("/deleteProduct/:id",Controller.deleteProduct);

router.get("/signOut",Controller.signOut);

router.post("/localStorage",Controller.localStorage);

router.post("/update",Controller.update);

module.exports=router

