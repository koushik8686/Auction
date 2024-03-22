const sellermodel =  require("../../models/sellermodel")
const {itemmodel} =  require("../../models/itemmodel")

const path = require("path");

function sellerlogin_get(req, res) { 
    res.sendFile(path.join(__dirname, "../../views/sellerlogin.html"));
}
function sellerlogin_post(req, res) { 
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
           res.redirect("/sellerhome/"+item._id)
        } else {
          res.send("wrong pass")
        }
    })
   }

module.exports = {sellerlogin_get, sellerlogin_post}