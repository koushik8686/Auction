const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const { MongoClient, ServerApiVersion } = require('mongodb');
// mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/projectv2");
// mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/fsd-project");
 mongoose.connect("mongodb://127.0.0.1:27017/project");
//models 
const usermodel = require("./models/usermodel")
const {itemmodel} = require("./models/itemmodel")
const sellermodel = require("./models/sellermodel")

app.listen(3000, function (param) {  })

//user routes
app.get("/", function (req, res) {  res.sendFile(__dirname+"/views/intro.html")})
app.use("/register", require("./routers/user-routes/user_register"))
app.use("/login",require("./routers/user-routes/user_login"))
app.use("/user", require("./routers/user-routes/user_home") )
app.use("/items", require("./routers/user-routes/user_items") ) // route for individual user items
app.use("/auction", require("./routers/user-routes/user_auctionpage")) //auction page for users

//seller routes
app.get("/seller", function (req, res) {  res.sendFile(__dirname+"/views/sellerintro.html")})
app.use("/sellerregister", require("./routers/seller-routes/seller_register") )
app.use("/sellerlogin",require("./routers/seller-routes/seller_login") )
app.use("/sellerhome",require("./routers/seller-routes/seller_home"))
app.use("/:seller/create", require("./routers/seller-routes/create_auction") )
app.use("/sell",require("./routers/seller-routes/sell_item")) //route for owner of the item

//admin 
app.use("/admin",require("./routers/admin-routes/admin_login"))
app.use("/adminpage",require("./routers/admin-routes/admin_home"))
app.use("/delete/:type/:id" ,require("./routers/admin-routes/deleteitem") )