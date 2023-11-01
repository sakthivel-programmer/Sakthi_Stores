const express=require("express");
const port=3000;
const app=express();

app.use(express.urlencoded());



const db=require("./config/mongoose")


app.set("views","./views");
app.set("view engine", "ejs");

app.use(express.static(__dirname + 'assets'));
app.use("/assets", express.static(__dirname + '/assets'));
// app.use("/images", express.static(__dirname + '/images'));



app.use("/", require("./routes"));

app.listen(port,function(err){
    if(err){
        console.log("Error in running server",err);
        return;
    }
    console.log("Server running successfully on port no:",port);
});