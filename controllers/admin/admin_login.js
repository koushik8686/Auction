
const path = require("path");
const adminmodels = require("../../models/adminmodel");
const {set_session , get_session} = require("../..//middleware/admin-sessions/adminauth")
function adminlogin_get(req, res) { 
  if (get_session(req)) {
    return res.redirect("/admin/home/"+get_session(req));
   }
    res.sendFile(path.join(__dirname, "../../views/adminlogin.html"));
}
function adminlogin_post (req, res) { 
  var email = req.body.email
  var pass = req.body.pass
  adminmodels.find().then((arr) => {
    var admin;
    for (let index = 0; index < arr.length; index++) {
      if (arr[index].password == pass && arr[index].email == email) {
        admin = arr[index];
        break; // Exit loop once user is found
      }
    }
    if (!admin) {
      res.redirect("/");
    } else {
      if (admin.password == pass) {
        var AdminId = admin._id;
        set_session(req, AdminId); // Set the session with the user ID
        res.redirect("/admin/home/" + AdminId);
      } else {
        res.send("Wrong password");
      }
    }
  });
   }

module.exports={adminlogin_get , adminlogin_post}