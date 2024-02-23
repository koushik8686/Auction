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
mongoose.connect('mongodb://127.0.0.1:27017/project')
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
  type:String,
  class:String, 
  aution_active:Boolean
})
const userschema = mongoose.Schema({
    email:String,
    password:String,
    items:[itemschema],
    isremoved:Boolean
})
const sellerschema = mongoose.Schema({
  name:String,
  email:String,
  phone :String,
  password:String,
  items:[itemschema],
  isremoved :Boolean
})
const sellermodel = mongoose.model("sellers", sellerschema)
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
          }  else{ 
        if (item.password==pass) {
    var t= item._id
           res.redirect("/user/"+item._id)
        } else {
          res.send("wrong pass")
         } }
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
    res.render("home", {arr:data})
  })
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
   name=result.email
  })
  itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
    if (!result) {
      res.send("item sold")
      res.redirect("/user/"+req.params.userid)
      return
    }
    if (result.aution_active) {
      res.send("item sold")
      res.redirect("/user/"+req.params.userid)
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
    res.render("auctionpage",{arr:data} )
   })
 })
app.post("/:userid/auction/item/:itemid", function (req, res) { 
  console.log("heere")
  var price=0
   price =Number(req. body.bid)
  var name = " "
  usermodel.findOne({_id:req.params.userid}).then((result)=>{
    name=result.email
  })
  itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
    if (!result) {
      res.send("item sold")
      return
    }
    console.log(result);
  if (price<result.current_price||price<result.base_price) {
 console.log(price, typeof(price));
    console.log("/"+req.params.userid+"/auction/item/"+req.params.itemid)    
    res.redirect("/"+req.params.userid+"/auction/item/"+req.params.itemid)
  }else{
    itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
      result.current_price=price
      result.current_bidder=name
      result.current_bidder_id=req.params.userid
       result.save();
       res.redirect("/"+req.params.userid+"/auction/item/"+req.params.itemid)
      })
  }
    })
  })


//seller authentication
app.get("/sellerregister", function (req, res) { res.sendFile(__dirname+"/views/sellerregister.html") })
app.post("/sellerregister" , function (req , res) { 
  const a = new sellermodel ({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      password:req.body.pass,
      items:[]
        })
  a.save()
  res.redirect("/sellerlogin")}
  )
  
app.get("/sellerlogin", function (req, res) { res.sendFile(__dirname+"/views/sellerlogin.html") })
app.post("/sellerlogin", function (req, res) { 
  var email = req.body.email
  var pass = req.body.pass
  sellermodel.find().then((arr)=>{
      var item
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].password==pass&&arr[index].email==email) {
          item=arr[index]
        }
      }
      if (item===undefined) {
          res.redirect("/sellerregister")
          return
      }    
      if (item.password==pass) {
  var t= item._id
         res.redirect("/seller/"+item._id)
      } else {
        res.send("wrong pass")
      }
  })
 })
app.get("/seller/:id", function (req, res) { 
  sellermodel.findOne({_id:req.params.id}).then((result)=>{
     res.render("sellerhome",{arr:result , seller: req.params.id})
  })
 })
app.get("/:seller/create", function (req, res) { 
  console.log("req")
res.render("create" , {k:req.params.seller})
})
app.post("/:sellerid/create", function (req, res) { 
  var nam = "";
  sellermodel.find().then((arr) => {
      for (let index = 0; index < arr.length; index++) {
          console.log(arr[index]._id, req.params.name, arr[index].email);
          if (arr[index]._id == req.params.sellerid) {
              console.log("ok");
              nam = arr[index].name;
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
                  pid: req.params.sellerid,
                  url: req.body.link,
                  base_price: req.body.price,
                type:req.body.type,
                current_price:req.body.price,
                current_bidder:" ",
                current_bidder_id:" ",
                class:classs,
                aution_active:false
                });
              console.log(item)
              item.save()
              sellermodel.findOne({ _id: req.params.sellerid })
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
                // console.error('Error updating user:', err);
              });
              return;
          }
      }
  }).catch((error) => {
      // console.error("Error:", error);
  });
res.redirect("/seller/"+req.params.sellerid)
})

//route for owner of the item
app.get("/sell/:seller/:itemid", async function (req, res) { 
  console.log("okaqy")
  var name = " "
  await sellermodel.findOne({_id:req.params.seller}).then((result)=>{
   name=result.name
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
    user: req.params.seller,
    username:name,
    item:result
   }
    res.render("ownerpage",{arr:data} )
   })
 })
app.post("/sell/:seller/:itemid", async function (req, res) {
  var solditem
 await itemmodel.findOne({_id:req.params.itemid}).then( async (result)=>{
   if (!result) {
     res.send("itemsold")
   }
       result.person=result.current_bidder
       result.save()
       console.log("after", result)
       solditem=result
 //deleting in owner
      await sellermodel.findOneAndUpdate(
        { _id: req.params.seller },
        { $pull: { items: { _id: req.params.itemid } } },
        { new: true }
      )

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
  res.redirect("/seller/"+req.params.seller)
}) 
 app.get("/", function (req, res) { 
    res.sendFile(__dirname+"/views/intro.html")
  })
app.get("/seller", function (req, res) {  res.sendFile(__dirname+"/views/sellerintro.html")})

//admin authentication
var adminid="koushik"
var adminpass="1234"
app.get("/admin",function (req, res) { res.sendFile(__dirname+"/views/adminlogin.html") })
app.post("/admin",function (req, res) { 
  if (req.body.name==adminid) {
    if (req.body.pass==adminpass) {
      res.redirect("/adminpage")
    }else{
      res.send("wrong pass")
    }
  }else{
    res.send("wrong id")
  }
 })

//admin page
app.get("/adminpage",async function (req, res) { 
 
  var users =[]
  var items = []
  var sellers =[]

  await usermodel.find().then((arr)=>{
    arr.forEach(element => {
      users.push(element)
    });
   })
  await itemmodel.find().then((arr)=>{
    arr.forEach(element => {
      items.push(element)
    });
   })
  await sellermodel.find().then((arr)=>{
    arr.forEach(element => {
      sellers.push(element)
    });
   })
  
  var data ={
     usersdata:users,
     sellersdata:sellers,
     itemsdata:items
  }
  // res.send(data)
  res.render("adminpage",{data:data})
 })

app.get("/delete/:type/:id" , async function (req, res) { 
  switch (req.params.type) {
    case "user":
      await usermodel.findByIdAndDelete(req.params.id);
      res.redirect("/adminpage")
      break;
    case "seller":
    await sellermodel.findOne({_id:req.params.id}).then(async(arr)=>{
      for (let i = 0; i < arr.items.length; i++) {
       await itemmodel.findByIdAndDelete(arr.items[i]._id) 
      }
    })  
    await sellermodel.findByIdAndDelete(req.params.id);
      res.redirect("/adminpage")
      break;
    case "item":
      const itemId = req.params.id;

      // Find the item by ID and get the seller ID (arr.pid)
      const item = await itemmodel.findOne({ _id: itemId });
      if (!item) {
        return res.status(404).send("Item not found");
      }
  
      const sellerId = item.pid;
  
      // Update the seller model to remove the item from the items array
      await sellermodel.findOneAndUpdate(
        { _id: sellerId },
        { $pull: { items: { _id: itemId } } },
        { new: true }
      );
      await itemmodel.findByIdAndDelete(itemId);
  
      res.redirect("/adminpage")
      break;
    default:
      break;
  }
 })
app.listen(3000, function (param) {  })