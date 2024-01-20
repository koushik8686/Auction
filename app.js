const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var items =[]
const { MongoClient, ServerApiVersion } = require('mongodb');
mongoose.connect('mongodb+srv://pinnukoushik1:koushik2004@koushik.jttd3u3.mongodb.net/users');

app.get("/register", function (req, res) { 
    res.sendFile(__dirname+"/views/register.html")
 })

const userschema = mongoose.Schema({
    email:String,
    password:String
})
const itemschema= mongoose.Schema({
    person:userschema,
    url:String,
    base_price:Number,
    date:Date,
    time:String
})
const usermodel = mongoose.model("userdetails",userschema)
const itemmodel = mongoose.model("items", itemschema)
app.post("/register", function (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    const a = new usermodel ({
        email:email,
        password:pass
    })
    a.save()
    console.log(a)
    res.redirect("/")
 })

 app.get("/login", function (req, res) { 
    res.sendFile(__dirname+"/views/login.html")
  })

app.post("/login" , function (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    usermodel.find().then((arr)=>{
        console.log(arr)
        var item
        for (let index = 0; index < arr.length; index++) {
          if (arr[index].password==pass) {
            item=arr[index]
          }
        }
        console.log(item)
        if (!item) {
            res.redirect("/signup")
        }
        
        if (item.password==pass) {
            console.log(item._id)
            res.redirect("/user/"+item._id)
        } else {
          res.send("wrong pass")
        }
    })
 })
 
app.get("/user/:email" , function (req, res) { 
  var arr=[]
  res.render("home", arr)
 })



 app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/views/intro.html")
  })

app.listen(3000, function (param) {  })

