const usermodel = require("../../models/usermodel");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function userregister_get(req, res) { 
    res.render('register') 
    }

function userregister_post(req, res) { 
    var email = req.body.email;
    var pass = req.body.pass;
    bcrypt.hash(pass, saltRounds, function(err, hashedPassword) {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send("Internal Server Error");
        }

        usermodel.findOne({ email: email }).then((user) => {    
            if (user) {
                return res.send(`<h2>Email already exists, please try with another email.</h2><br><a href="/register">Try Again</a>`);
            }

            const newUser = new usermodel({
                email: email,
                password: hashedPassword, 
                items: []
            });
            newUser.save().then(() => {
                res.redirect("/");
            }).catch((error) => {
                console.error("Error saving new user:", error);
                res.status(500).send("Internal Server Error");
            });
        }).catch((error) => {
            console.error("Error checking if user exists:", error);
            res.status(500).send("Internal Server Error");
        });
    });
}

module.exports = {
    userregister_get,
    userregister_post
};
