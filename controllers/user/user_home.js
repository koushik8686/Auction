const usermodel =  require("../../models/usermodel")
const {itemmodel} =  require("../../models/itemmodel")
const {set_session , get_session} = require("../../middleware/user-cookies/userauth")

async function render_user_home (req, res) { 
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
  }

module.exports= render_user_home