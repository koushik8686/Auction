const usermodel = require("../../models/usermodel")

const path = require("path");

function userregister_get(req, res) { 
    res.sendFile(path.join(__dirname, "../../views/register.html"));
}


function userregister_post (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    const a = new usermodel ({
        email:email,
        password:pass,
        items:[]
          })
    a.save()
    console.log(a)
    res.redirect("/")
 }

 module.exports={
    userregister_get,
    userregister_post
 }