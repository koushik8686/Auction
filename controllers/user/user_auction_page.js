const usermodel =  require("../../models/usermodel")
const {itemmodel} =  require("../../models/itemmodel")

async function render_auctionpage(req, res) { 
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
   }

 async function bid (req, res) { 
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
         res.redirect("/auction//"+req.params.userid+"/item/"+req.params.itemid)
        })
    }
      })
    }
   

module.exports = {render_auctionpage , bid }