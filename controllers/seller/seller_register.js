const sellermodel =  require("../../models/sellermodel")
const {itemmodel} =  require("../../models/itemmodel")
const path = require("path");

function sellerregister_get(req, res) { 
    res.sendFile(path.join(__dirname, "../../views/sellerregister.html"));
}

function sellerregister_post(req, res) { 
    var email = req.body.email;
    sellermodel.findOne({ email: email }).then((user) => {
        if (user) {
            return res.send(`<h2>Email already exists, please try with another email.</h2><br><a href="/sellerregister">Try Again</a>`);
        }
        const newSeller = new sellermodel({
            name: req.body.name,
            email: email,
            phone: req.body.phone,
            password: req.body.pass,
            items: []
        });
        newSeller.save().then(() => {
            res.redirect("/sellerlogin");
        }).catch((error) => {
            console.error("Error saving new seller:", error);
            res.status(500).send("Internal Server Error");
        });
    }).catch((error) => {
        console.error("Error finding seller:", error);
        res.status(500).send("Internal Server Error");
    });
}


module.exports={ sellerregister_get , sellerregister_post}