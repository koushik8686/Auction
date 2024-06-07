const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const adminmodel = require("./models/adminmodel")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secretkey",
    resave: true,
    saveUninitialized: true,
    cookie: {  maxAge: null }, 
  })
);
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/fsd-project");
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
app.use("/popular", require("./routers/user-routes/popular") )
app.use("/items", require("./routers/user-routes/user_items") ) // route for individual user items
app.use("/auction", require("./routers/user-routes/user_auctionpage")) //auction page for users
app.use("/logout", require("./routers/user-routes/delete_session"))

//seller routes
app.get("/seller", function (req, res) {  res.sendFile(__dirname+"/views/sellerintro.html")})
app.use("/sellerregister", require("./routers/seller-routes/seller_register") )
app.use("/sellerlogin",require("./routers/seller-routes/seller_login") )
app.use("/sellerhome",require("./routers/seller-routes/seller_home"))
app.use("/create", require("./routers/seller-routes/create_auction") )
app.use("/sell",require("./routers/seller-routes/sell_item")) //route for owner of the item

//admin 
app.use("/admin",require("./routers/admin-routes/admin_login"))
app.use("/admin/home",require("./routers/admin-routes/admin_home"))
app.use("/admin/logout", require("./routers/admin-routes/delete_session_admin"))
app.use("/delete" ,require("./routers/admin-routes/deleteitem") )

//super-user
app.use("/superUser/login" , require("./routers/super-user-routes/super_user_login"))
app.use("/admincreate",require("./routers/super-user-routes/admin_create_route") )
app.use("/superUser/home", require("./routers/super-user-routes/superuser-home") )
app.use("/changepermissions",require("./routers/super-user-routes/changepermission"));
