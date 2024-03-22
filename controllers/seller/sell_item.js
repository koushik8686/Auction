const sellermodel = require("../../models/sellermodel")
const usermodel = require("../../models/usermodel")
const {itemmodel} = require("../../models/itemmodel")

async function sellingpage_get(req, res) { 
    var name = ""
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
   }
async function sellingpage_post(req, res) {
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
    res.redirect("/sellerhome/"+req.params.seller)
  }

module.exports= {sellingpage_get, sellingpage_post}