const sellermodel = require("../../models/sellermodel")

function render_sellerhome (req, res) { 
    sellermodel.findOne({_id:req.params.id}).then((result)=>{
       res.render("sellerhome",{arr:result , seller: req.params.id})
    })
   }

module.exports = render_sellerhome