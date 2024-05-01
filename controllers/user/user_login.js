const usermodel = require("../../models/usermodel");
const { set_session, get_session } = require("../../middleware/user-cookies/userauth");
const bcrypt = require('bcrypt');
const path = require("path");

function userlogin_get(req, res) { 
    if (get_session(req)) {
        return res.redirect("/user/" + get_session(req));
    }
    res.sendFile(path.join(__dirname, "../../views/login.html"));
}

async function userlogin_post(req, res) { 
    var email = req.body.email;
    var pass = req.body.pass;

    try {
        const user = await usermodel.findOne({ email: email });

        if (!user) {
            return res.redirect("/register");
        }

        const passwordMatch = await bcrypt.compare(pass, user.password);

        if (passwordMatch) {
            var userId = user._id;
            set_session(req, userId);
            return res.redirect("/user/" + userId);
        } else {
            return res.send("Wrong password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    userlogin_get,
    userlogin_post
};
