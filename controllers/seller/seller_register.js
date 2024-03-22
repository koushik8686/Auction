const sellermodel =  require("../../models/sellermodel")
const {itemmodel} =  require("../../models/itemmodel")
const path = require("path");

function sellerregister_get(req, res) { 
    res.sendFile(path.join(__dirname, "../../views/sellerregister.html"));
}

function sellerregister_post(req , res) { 
    const a = new sellermodel ({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        password:req.body.pass,
        items:[]
          })
    a.save()
    res.redirect("/sellerlogin")}

module.exports={ sellerregister_get , sellerregister_post}