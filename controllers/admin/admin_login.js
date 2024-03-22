
const path = require("path");

function adminlogin_get(req, res) { 
    res.sendFile(path.join(__dirname, "../../views/adminlogin.html"));
}
var adminid="koushik"
var adminpass="1234"
function adminlogin_post (req, res) { 
    if (req.body.name==adminid) {
      if (req.body.pass==adminpass) {
        res.redirect("/adminpage")
      }else{
        res.send("wrong pass")
      }
    }else{
      res.send("wrong id")
    }
   }

module.exports={adminlogin_get , adminlogin_post}