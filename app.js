const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var items =[]
const { MongoClient, ServerApiVersion } = require('mongodb');
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/users"); 

app.get("/register", function (req, res) { 
    res.sendFile(__dirname+"/views/register.html")
 })

const userschema = mongoose.Schema({
    email:String,
    password:String
})
const modal = mongoose.model("userdetails",userschema)
app.post("/register", function (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    const a = new modal ({
        email:email,
        password:pass
    })
    a.save()
 })

 app.get("/", function (req, res) { 
    res.redirect("/register")
  })

app.listen(3000, function (param) {  })

