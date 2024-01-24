// requiring user schema schema
const User=require("../models/schema");
// requiring product schema
const Product=require("../models/products");
var store = require('store')

// controller for render logon page
module.exports.Logon = function(req,res){
    return res.render("Logon",{
        heading:"Logon | Page"
    })
}

// controller for render admin logon
module.exports.adminLogon = function(req,res){
    return res.render("adminSignIn",{
        heading:"Admin Logon | Page"
    })
}

// controller for user sign up
module.exports.signUp = function(req,res){
    return res.render("sign_up",{
        heading:"Sign Up | Page"
    })
}

// controller for create user in the DB
module.exports.createUser=async function(req,res){
    // checking if the password and confirm password are same
    if(req.body.password != req.body.confirm_password){
        console.log("password and consfirm password not matching")
        return res.redirect("back")
    }
    // checking the existence of the user in DB
    const user=await User.findOne({email:req.body.email})
    // if not then create the user in DB
    if(!user){
        await User.create({
            userName:req.body.name,
            email:req.body.email,
            password:req.body.password,
            cart:[0]
        })
        console.log("User created in DB")
        return res.redirect("/")

    }
    // if user already existed then return back to the same page
    if(user){
        console.log("User email already found") 
        return res.redirect("back")
    }
}

// controller for create user session
module.exports.createSession =async function(req,res){
    if(req.body.email){
        // fiding user in the DB
        const user=await User.findOne({email:req.body.email})
        // checking if the password is correct from both the sides
        if(user){
            if(user.password===req.body.password){
                console.log("User signed in")
                await res.cookie("email",req.body.email)
                // await res.cookie("cart",JSON.stringify(user.cart))
                const products=await Product.find()
                console.log(user.cart,"Ssssssssss")
                return res.render("userSpace",{
                    heading:"Sakthi Stores",
                    products:products,
                    cart:user.cart,
                    user_name:user.userName.toLowerCase(),
                    
                })
            }else{
                console.log("Password is wrong")
                return res.redirect("back")
            }
        }
        // if user not found, ask user to sign up
        console.log("User not found, please sign up")
        return res.redirect("back")
    }else{
        const user=await User.findOne({email:req.cookies.email})
        const products=await Product.find()
        return res.render("userSpace",{
            heading:"Sakthi Stores",
            products:products,
            cart:user.cart,
            user_name:user.userName.toLowerCase()
        })
    }
}

// controller to create admin session
module.exports.createAdminSession = async function(req,res){
    // checking whether the admin credential predefined in the DB or not
    const user = await User.findOne({email:req.body.email})
    if(user){
        // if true the check the password and render admin page
        if(user.email === "klsakthi333@gmail.com" && req.body.password === user.password){
            const products=await Product.find()
            return res.render("adminPage",{
                heading:"Admin | Page",
                products:products
            })       
        }
    }
    // if the admin crendentials is entered wrong
    console.log("Please provoid valid user credentials")
    return res.redirect("back")
}

// controller for get back to admin session after adding product
module.exports.backAdminSession=async function(req, res){
    const products=await Product.find()
    return res.render("adminPage",{
        heading:"Admin | Page",
        products:products
    })
}

// constroller for render add product page
module.exports.addProduct=async function(req, res){
    return res.render("addProduct",{
        heading:"Admin | Add New Product"
    })
}

// controller for create product in the DB
module.exports.createProduct=async function(req, res){
    // checking if the product already exist ot not
    const product=await Product.findOne({productName:req.body.name})
    // if not then create the product
    if(!product){
        await Product.create({
            productName:req.body.name,
            price:req.body.price,
            productRating:req.body.rating,
            qtyAvailable:req.body.stock,
            category:req.body.category,
            imageName:req.body.product_img
        })
        console.log("Product added successfully")
        return res.redirect("back")
    }
    // if product already exist
    if(product){
        console.log("Product name already available")
        return res.redirect("back")
    }
}

// controller for delete particular product with its unique id
module.exports.deleteProduct=async function(req,res){
    // searching product eith its id
    const product=await Product.findById(req.params.id)
    // if found then initializing deletion
    if(product){
        await Product.findByIdAndDelete(req.params.id)
        console.log("Product deleted successfully")
        return res.redirect("/admin/backAdminSession")
    }
    // if not found
    console.log("Product not found to deletion")
    return res.redirect("/admin/backAdminSession")
}

// controller for signout
module.exports.signOut=async function(req,res){
    return res.redirect("/")
}

// controller for render buynow page
module.exports.buyNow=async function(req,res){
    return res.render("buyNow",{
        heading: "Buy Now",
    })
}
// local storage for store fieldname and product id while updating product details
module.exports.creatingCookies=async function(req,res){
    // setting values to cookie
    await res.cookie("fieldName",req.query.name);
    await res.cookie("productId",req.query.id);
    // rendering modal to update new value
    return res.status(200).render("modal",{fieldName:req.query.name})
}

// controller for updating changes
module.exports.update=async function(req,res){
    // fetching from cookies
    var fieldName=await req.cookies.fieldName
    var productId=await req.cookies.productId
    // swicth cases upon product fieldname to update 
    if(fieldName === "productName"){
        console.log("yes")
        await Product.findByIdAndUpdate(productId,{"productName":req.body.newValue})
        console.log("Updated!!")
        return res.redirect("/admin/backAdminSession")
    }
    else if(fieldName === "price"){
        await Product.findByIdAndUpdate(productId,{"price":req.body.newValue})
        console.log("Updated!!")
        return res.redirect("/admin/backAdminSession")
    }
    else if(fieldName === "productRating"){
        await Product.findByIdAndUpdate(productId,{"productRating":req.body.newValue})
        console.log("Updated!!")
        return res.redirect("/admin/backAdminSession")
    }
    else if(fieldName === "qtyAvailable"){
        await Product.findByIdAndUpdate(productId,{"qtyAvailable":req.body.newValue})
        console.log("Updated!!")
        return res.redirect("/admin/backAdminSession")
    }
    else if(fieldName === "category"){
        await Product.findByIdAndUpdate(productId,{"category":req.body.newValue})
        console.log("Updated!!")
        return res.redirect("/admin/backAdminSession")
    }
    else if(fieldName === "imageName"){
        await Product.findByIdAndUpdate(productId,{"imageName":req.body.newValue})
        console.log("Updated!!")
        return res.redirect("/admin/backAdminSession")
    }
    return res.redirect("/admin/backAdminSession")
}

module.exports.detailedView=async function (req,res){
    const product=await Product.find({"productName":req.body.product_name})
    if(product.length!=0){
        return res.render("searchResults",{
            heading:"Product | Details",
            searchResult:product
        })
    }
    return res.redirect("back")
}
module.exports.addToCart=async function(req,res){
    
    const user= await User.findOne({email:req.cookies.email})
    let cartItem=[...user.cart]
    let total = Number(cartItem[0])
    total+=Number(req.query.prod_price)
    cartItem[0]=total
    cartItem.push({
        productName:req.query.prod_name,
        productImage:req.query.prod_image,
        productPrice:req.query.prod_price
    })
    await User.findOneAndUpdate({email:req.cookies.email},{cart:cartItem})
    return res.redirect("back")
}

module.exports.openCart=async function (req,res){
    const user= await User.findOne({email:req.cookies.email})
    return res.render("cart",{
        heading:"Cart Items",
        cart:user.cart
    })
}
module.exports.removeFromCart=async function (req,res){
    const user= await User.findOne({email:req.cookies.email})
    const removable_item = user.cart.splice(req.params.item_id,1)
    console.log("removable",req.params.item_id,removable_item)
    let total = Number(user.cart[0])
    user.cart[0]= total - Number(removable_item[0].productPrice)
    if (total===0){
        user.cart[0]=0
    }
    await User.findOneAndUpdate({email:req.cookies.email},{cart:user.cart}) 
    return res.redirect("back")
}
module.exports.searchingg = async function(req,res){
    let payload = req.body.payload.trim();
    let search = await Product.find({productName: {$regex: new RegExp('^'+payload+'.*','i')}}).exec();
    search = search.splice(0,10)
    res.send({payload: search});
}
