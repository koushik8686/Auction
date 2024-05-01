const usermodel =  require("../../models/usermodel")
const {itemmodel} =  require("../../models/itemmodel")

async function render_useritems (req, res) { 
    await usermodel.findOne({_id:req.params.id}).then((result)=>{
      // if (result.items.length==0) {
      //   res.send("no items ")
      //   return
      // } 
      res.render("item",{arr:result} )
     })
   }

module.exports = render_useritems