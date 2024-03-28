const usermodel = require("../../models/usermodel")
const {set_session , get_session} = require("../../middleware/user-cookies/userauth")
const path = require("path");

function userlogin_get(req, res) { 
    if (get_session(req)) {
      res.redirect("/user/"+get_session(req));
    }
    res.sendFile(path.join(__dirname, "../../views/login.html"));
}
function userlogin_post (req, res) { 
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
      set_session(req , t)
           res.redirect("/user/"+item._id)
        } else {
          res.send("wrong pass")
         } }
    })
 }

 module.exports= {
    userlogin_get,
    userlogin_post
 }
