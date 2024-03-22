const sellermodel = require("../../models/sellermodel")
const usermodel = require("../../models/usermodel")
const {itemmodel} = require("../../models/itemmodel")

async function adminpage_get(req, res) { 
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
   }

module.exports=adminpage_get