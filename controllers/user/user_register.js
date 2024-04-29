const usermodel = require("../../models/usermodel")

const path = require("path");

function userregister_get(req, res) { 
 
res.render('register') 
}

function userregister_post (req, res) { 
    var email = req.body.email
    var pass = req.body.pass
    var user= usermodel.findOne({ email: req.body.email})
    if (user) {
      res.send(`<h2>Email already exists, please try with another email.</h2><br><a href="/register">Try Again</a>`)
     return
    }
    const a = new usermodel ({
        email:email,
        password:pass,
        items:[]
          })
    a.save()
    res.redirect("/")
 }

 module.exports={
    userregister_get,
    userregister_post
 }