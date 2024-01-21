const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var items =[]
const { MongoClient, ServerApiVersion } = require('mongodb');
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/project");

app.get("/register", function (req, res) { 
    res.sendFile(__dirname+"/views/register.html")
 })
 const itemschema= mongoose.Schema({
  name:String,
  person:String,
  pid:String,
  url:String,
  base_price:Number,
  date:String,
  type:String
})
const userschema = mongoose.Schema({
    email:String,
    password:String,
    arts:[itemschema],
    antiques:[itemschema],
    used:[itemschema]
})

const usermodel = mongoose.model("userdetails",userschema)
const itemmodel = mongoose.model("items", itemschema)
app.post("/register", function (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    const a = new usermodel ({
        email:email,
        password:pass,
        arts:[],
        antiques:[],
        used:[],
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
        var item
        for (let index = 0; index < arr.length; index++) {
          if (arr[index].password==pass) {
            item=arr[index]
          }
        }
        if (!item) {
            res.redirect("/register")
        }
        
        if (item.password==pass) {
    var t= item._id
            res.redirect("/user/"+item._id)
        } else {
          res.send("wrong pass")
        }
    })
 })
 
app.get("/user/:email" , function (req, res) { 
  itemmodel.find().then((arr)=>{
    var data = {
        id:req.params.email,
        items:arr
    }
    res.render("home", {arr:data})
  })
 })

app.get("/user/create/:name", function (req, res) { 
    console.log("req")
  res.render("create" , {k:req.params.name})
 })
app.post("/user/create/:name", function (req, res) { 
    var nam = "";

    usermodel.find().then((arr) => {
        for (let index = 0; index < arr.length; index++) {
            console.log(arr[index]._id, req.params.name, arr[index].email);
            if (arr[index]._id == req.params.name) {
                console.log("ok");
                nam = arr[index].email;
              console.log(typeof(req.body.date))
                const item = new itemmodel({
                    name: req.body.name,
                    person: nam,
                    pid: req.params.name,
                    url: req.body.link,
                    base_price: req.body.price,
                    date: req.body.date,
                  type:req.body.type
                  });
                item.save()
                return;
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
    
    // The following console.log will likely execute before the user is found

  res.redirect("/user/"+req.params.name)
})

 app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/views/intro.html")
  })

app.listen(3000, function (param) {  })

