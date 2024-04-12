const sellermodel =  require("../../models/sellermodel")
const {itemmodel} =  require("../../models/itemmodel")
const {set_sellersession, get_sellersession } = require("../../middleware/seller-sessions/sellerauth")

const path = require("path");

function sellerlogin_get(req, res) { 
  if (get_sellersession(req)) {
    return res.redirect("/sellerhome/"+get_sellersession(req));
   }
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
    var seller_id= item._id
    set_sellersession(req, seller_id); // Set the session with the user ID
           res.redirect("/sellerhome/"+item._id)
        } else {
          res.send("wrong pass")
        }
    })
   }

module.exports = {sellerlogin_get, sellerlogin_post}