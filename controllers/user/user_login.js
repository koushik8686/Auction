const usermodel = require("../../models/usermodel")
const {set_session , get_session} = require("../../middleware/user-cookies/userauth")
const path = require("path");

function userlogin_get(req, res) { 
    if (get_session(req)) {
      return res.redirect("/user/" + get_session(req));}
    res.sendFile(path.join(__dirname, "../../views/login.html"));
}
function userlogin_post (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    usermodel.find().then((arr) => {
      var item;
      for (let index = 0; index < arr.length; index++) {
        if ( arr[index].email == email) {
          item = arr[index];
          break; // Exit loop once user is found
        }
      }
      if (!item) {
        res.redirect("/register");
      } else {
        if (item.password == pass) {
          var userId = item._id;
          set_session(req, userId); // Set the session with the user ID
          res.redirect("/user/" + userId);
        } else {
          res.send("Wrong password");
        }
      }
    });
  }    

 module.exports= {
    userlogin_get,
    userlogin_post
 }
