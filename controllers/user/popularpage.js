const usermodel = require("../../models/usermodel");
const { itemmodel } = require("../../models/itemmodel");

async function render_user_home(req, res) {
    try {
        var name = "";
        const user = await usermodel.findOne({ _id: req.params.email });
        if (user) {
            name = user.email;
        }
        const items = await itemmodel.find();
        items.sort((a, b) => b.visited_users.length - a.visited_users.length);
        const data = {
            user: name,
            id: req.params.email,
            items: items
        };
        res.render("popular", { arr: data });
    } catch (error) {
        console.error("Error rendering user home:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = render_user_home;
