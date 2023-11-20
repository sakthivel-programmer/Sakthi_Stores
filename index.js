//requiring express
const express=require("express");
//Port number to run server
const port=3000;
// calling our express as function
const app=express();
// requiring cookie parser
const cookieParser = require('cookie-parser');
// body data parser
app.use(express.urlencoded());
// recuiring db
const db=require("./config/mongoose");
// Calling cookie parser as middleware
app.use(cookieParser());
// EJS view engine
app.set("views","./views");
app.set("view engine", "ejs");
// access static folder
app.use(express.static(__dirname + 'assets'));
app.use("/assets", express.static(__dirname + '/assets'));
// initializing routes
app.use("/", require("./routes"));
// to run our server
app.listen(port,function(err){
    if(err){
        console.log("Error in running server",err);
        return;
    }
    console.log("Server running successfully on port no:",port);
});
