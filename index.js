const mongoose = require("mongoose")
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const { MongoClient, ServerApiVersion } = require('mongodb');
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/projectv2");

app.get("/register", function (req, res) { 
    res.sendFile(__dirname+"/views/register.html")
 })
 const itemschema= mongoose.Schema({
  name:String,
  person:String,
  pid:String,
  url:String,
  base_price:Number,
  current_bidder:String,
  current_bidder_id:String,
  current_price:String,
  date:String,
  type:String,
  class:String, 
  aution_active:Boolean
})
const userschema = mongoose.Schema({
    email:String,
    password:String,
    items:[itemschema]
})
const usermodel = mongoose.model("userdetails",userschema)
const itemmodel = mongoose.model("items", itemschema)
app.post("/register", function (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    const a = new usermodel ({
        email:email,
        password:pass,
        items:[]
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
          if (arr[index].password==pass&&arr[index].email==email) {
            item=arr[index]
          }
        }
        if (item===undefined) {
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
app.get("/user/:email" , async function (req, res) { 
  var name = " "
 await usermodel.findOne({_id:req.params.email}).then((result)=>{
    name=result.email
     })
  itemmodel.find().then((arr)=>{
    var data = {
        user:name,
        id:req.params.email,
        items:arr
    }
    console.log(data)
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
                var classs =""
                switch (req.body.type) {
                  case "art":
                    classs="black"
                    break;
                  case "antique":
                    classs="blue"
                    break;
                  case "used":
                    classs="red" 
                    break;
                  default:
                    break;
                }
                const item = new itemmodel({
                    name: req.body.name,
                    person: nam,
                    pid: req.params.name,
                    url: req.body.link,
                    base_price: req.body.price,
                    date: req.body.date,
                  type:req.body.type,
                  current_price:req.body.price,
                  current_bidder:" ",
                  current_bidder_id:" ",
                  class:classs,
                  aution_active:false
                  });
                console.log(item)
                item.save()
                usermodel.findOne({ _id: req.params.name })
                .then((user) => {
                  if (user) {
                    // User found, update the items array
                    user.items.push(item); 
                    return user.save();
                  } else {
                    console.log('User not found');
                  }
                })
                .catch((err) => {
                  console.error('Error updating user:', err);
                });
                return;
            }
        }
    }).catch((error) => {
        console.error("Error:", error);
    });
  res.redirect("/user/"+req.params.name)
})
// route for individual user items
app.get("/items/:id", async function (req, res) { 
  await usermodel.findOne({_id:req.params.id}).then((result)=>{
    if (result.items.length==0) {
      res.send("no items ")
      return
    } 
    res.render("item",{arr:result} )
   })
 })
//auction page for users
app.get("/:userid/auction/item/:itemid", async function (req, res) { 
  var name = " "
  await usermodel.findOne({_id:req.params.userid}).then((result)=>{
    console.log(result.email)
   name=result.email
  })
  console.log("name",name)
  itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
    if (!result) {
      res.send("item sold")
      return
    }
    if (result.aution_active) {
      res.send("item sold")
    }
    if (result.pid==req.params.userid) {
     res.redirect("/"+req.params.userid+"/auction/item/"+req.params.itemid+"/owner")
      return
    } 
   var data = {
    user: req.params.userid,
    username:name,
    item:result
   }
   console.log(data)
    res.render("auctionpage",{arr:data} )
   })
 })
app.post("/:userid/auction/item/:itemid", function (req, res) { 
  console.log("heere")
  var price = req. body.bid
  var name = " "
  usermodel.findOne({_id:req.params.userid}).then((result)=>{
    name=result.email
  })
  itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
    if (!result) {
      res.send("item sold")
      return
    }
  if (price<result.current_price||price<result.base_price) {
    console.log("/"+req.params.userid+"/auction/item/"+req.params.itemid)    
    res.redirect("/"+req.params.userid+"/auction/item/"+req.params.itemid)
  }else{
    itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
      result.current_price=price
      console.log(name)
      result.current_bidder=name
      result.current_bidder_id=req.params.userid
      console.log(result)
       result.save();
       res.redirect("/"+req.params.userid+"/auction/item/"+req.params.itemid)
      })
  }
    })
  })
//route for owner of the item
app.get("/:userid/auction/item/:itemid/owner", async function (req, res) { 
  console.log("okaqy")
  var name = " "
  await usermodel.findOne({_id:req.params.userid}).then((result)=>{
   name=result.email
  })
 await itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
  if (result===undefined) {
    res.send("item no  more for auction")
    return
  }
    if (result.aution_active) {
      res.send("item sold")
    }
   var data = {
    user: req.params.userid,
    username:name,
    item:result
   }
    res.render("ownerpage",{arr:data} )
   })
 })
app.post("/:userid/auction/item/:itemid/owner", async function (req, res) {
  var solditem
 await itemmodel.findOne({_id:req.params.itemid}).then( async (result)=>{
   if (!result) {
     res.send("itemsold")
   }
      console.log(result)
       result.person=result.current_bidder
       result.save()
       console.log("after", result)
       solditem=result
 //deleting in owner
  await usermodel.findOne({_id:req.params.userid}).then((user)=>{
      var objects=user.items
       console.log(objects)
       usermodel.findOneAndUpdate(
        { _id: req.params.userid },
        { $pull: { items: { _id: req.params.itemid } } },
        { new: true }
      )
     })
  //adding in buyer
  console.log("sold",solditem)
  var buyer = result.current_bidder_id
  console.log(buyer)
 await usermodel.findOne({_id:buyer}).then ((user)=>{
   console.log(user)
    var itemlength = user.items.length
    user.items[itemlength]=solditem
    user.save()
  })
  })
  await itemmodel.deleteOne({ _id: req.params.itemid });
  res.redirect("/user/"+req.params.userid)
})
 app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/views/intro.html")
  })
app.listen(3000, function (param) {  })