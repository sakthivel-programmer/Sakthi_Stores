const mongoose=require("mongoose");

const productsSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    productRating:{
        type:Number,
        required:true
    },
    qtyAvailable:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    imageName:{
        type:String,
        required:true
    }

},{
    timestamps:true
})
const Product= mongoose.model("Product",productsSchema);

module.exports=Product;