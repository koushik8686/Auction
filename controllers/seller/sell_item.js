const sellermodel = require("../../models/sellermodel")
const usermodel = require("../../models/usermodel")
const {itemmodel} = require("../../models/itemmodel")
var email = "hexart637@gmail.com"
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: 'ovss zdzg ktkf rptu'
  }
});


async function sellingpage_get(req, res) { 
    var name = ""
    await sellermodel.findOne({_id:req.params.seller}).then((result)=>{
     name=result.name
    })
   await itemmodel.findOne({_id:req.params.itemid}).then((result)=>{
    if (!result) {
      res.send("item sold")
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
   }
async function sellingpage_post(req, res) {
    var solditem
   await itemmodel.findOne({_id:req.params.itemid}).then( async (result)=>{
     if (!result) {
       res.send("itemsold")
     }
         result.person=result.current_bidder
         result.save()
         solditem=result
   //deleting in owner
        await sellermodel.findOneAndUpdate(
          { _id: req.params.seller },
          { $pull: { items: { _id: req.params.itemid } } },
          { new: true }
        )
        var phone=""
        await sellermodel.findOne({_id:req.params.seller}).then((result)=>{
         phone=result.phone
        })
    //adding in buyer
    var buyer = result.current_bidder_id
   await usermodel.findOne({_id:buyer}).then ((user)=>{
    var mailOptions = {
      from: email,
      to: user.email,
      subject: 'Item Bid Successful',
      html: `<h3>Congratulations</h3>
      <p>The seller had sold the item you were bidding to you</p>
      <h5>Item Details :</h5>
      <p>Name: ${solditem.name}</p>
      <p>Price: ${solditem.base_price}</p>
      <img style="width: 200px; height: 200px;" src="${solditem.url}" alt="">
      <p>Phone: ${phone}</p>`  }
      transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
      }
    });  
      var itemlength = user.items.length
      user.items[itemlength]=solditem
      user.save()
    })
    })
    await itemmodel.deleteOne({ _id: req.params.itemid });
    res.redirect("/sellerhome/"+req.params.seller)
  }

module.exports= {sellingpage_get, sellingpage_post}