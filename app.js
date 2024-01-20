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
const usermodel = mongoose.model("userdetails",userschema)
app.post("/register", function (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    const a = new usermodel ({
        email:email,
        password:pass
    })
    a.save()
    res.redirect("/")
 })

 app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/views/intro.html")
  })

app.listen(3000, function (param) {  })

