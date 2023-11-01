// const localStorage = require("../assets/localStorage");
const User=require("../models/schema");
const Product=require("../models/products");
module.exports.Logon = function(req,res){
    // console.log("i am here")
    return res.render("Logon",{
        heading:"Logon | Page"
    })
}
module.exports.adminLogon = function(req,res){
    // console.log("i am here")
    return res.render("adminSignIn",{
        heading:"Admin Logon | Page"
    })
}
module.exports.signUp = function(req,res){
    // console.log("i am here")
    return res.render("sign_up",{
        heading:"Sign Up | Page"
    })
}
module.exports.createUser=async function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back")
    }
    const user=await User.findOne({email:req.body.email})
    if(!user){
        await User.create({
            userName:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        return res.redirect("/")
    }
    if(user){
        console.log("User email already found")
        return res.redirect("/")
    }
}
module.exports.createSession =async function(req,res){
    const products=await Product.find()
    return res.render("userSpace",{
        heading:"Sakthi Stores",
        products:products
    })
}

module.exports.backUserSession=async function(req, res){
    const products=await Product.find()
    return res.render("userSpace",{
        heading:"Sakthi Stores",
        products:products
    })
}

module.exports.createAdminSession = async function(req,res){
    if(req.body.email){
        const user = await User.findOne({email:req.body.email})
        if(user){
            if(user.email === "klsakthi333@gmail.com" && req.body.password === user.password){
                const products=await Product.find()
                return res.render("adminPage",{
                    heading:"Admin | Page",
                    products:products
                })       
            }
        }
    }
    const products=await Product.find()
    return res.render("adminPage",{
        heading:"Admin | Page",
        products:products
    })
}
module.exports.backAdminSession=async function(req, res){
    const products=await Product.find()
    return res.render("adminPage",{
        heading:"Admin | Page",
        products:products
    })
}
module.exports.addProduct=async function(req, res){
    return res.render("addProduct",{
        heading:"Admin | Add New Product"
    })
}

module.exports.createProduct=async function(req, res){
    const product=await Product.findOne({productName:req.body.name})
    if(!product){
        await Product.create({
            productName:req.body.name,
            price:req.body.price,
            productRating:req.body.rating,
            qtyAvailable:req.body.stock,
            category:req.body.category
        })
        console.log("Product added successfully")
        return res.redirect("back")
    }
    if(product){
        console.log("Product name already available")
        return res.redirect("back")
    }
}

module.exports.deleteProduct=async function(req,res){
    const product=await Product.findById(req.params.id)
    if(product){
        await Product.findByIdAndDelete(req.params.id)
        console.log("Product deleted successfully")
        const products=await Product.find()
        return res.redirect("back")
    }
    console.log("Product not found to deletion")
    const products=await Product.find()
    return res.redirect("back")
}
module.exports.signOut=async function(req,res){
    return res.redirect("/")
}

module.exports.buyNow=async function(req,res){
    return res.render("buyNow",{
        heading: "Buy Now",
    })
}
const localStorage = require("localStorage");

module.exports.localStorage=function(req,res){
    localStorage.setItem('fieldName', req.body.updateValue)
    localStorage.setItem('productId', req.body.productId)
}
module.exports.update=async function(req,res){
    var fieldName=localStorage.getItem("fieldName");
    const productId=localStorage.getItem("productId");
    if(fieldName === "productName"){
        await Product.findByIdAndUpdate(productId,{"productName":req.body.newValue})
        return res.redirect("back")
    }
    if(fieldName === "price"){
        await Product.findByIdAndUpdate(productId,{"price":req.body.newValue})
        return res.redirect("back")
    }
    if(fieldName === "productRating"){
        await Product.findByIdAndUpdate(productId,{"productRating":req.body.newValue})
        return res.redirect("back")
    }
    if(fieldName === "qtyAvailable"){
        await Product.findByIdAndUpdate(productId,{"qtyAvailable":req.body.newValue})
        return res.redirect("back")
    }
    if(fieldName === "category"){
        await Product.findByIdAndUpdate(productId,{"category":req.body.newValue})
        return res.redirect("back")
    }
    return res.redirect("back")
}

module.exports.search= async function(req,res){
    const search=await Product.find({"productName":req.body.searchContent})
    if(search.length>0){
        console.log(search)
        return res.render("searchResults",{
            heading:"Search | Result",
            searchResult:search
        })
    }
    return res.redirect("back")
}

