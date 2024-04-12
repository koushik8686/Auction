const superusermodel = require("../../models/superusermoddel")
const path = require("path");

function superuserlogin_get(req, res) { 

    res.sendFile(path.join(__dirname, "../../views/superuserlogin.html"));
}
function superuserlogin_post(req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    superusermodel.find().then((arr)=>{
        var item
        for (let index = 0; index < arr.length; index++) {
          if (arr[index].password==pass&&arr[index].email==email) {
            item=arr[index]
          }
        }
        if (item===undefined) {
            res.send("wrong credentials")
            return
        }    
        if (item.password==pass) {
           res.redirect("/superUser/home")
        } else {
          res.send("wrong pass")
        }
    })
   }

module.exports = {superuserlogin_get, superuserlogin_post}