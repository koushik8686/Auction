const adminmodel = require("../../models/adminmodel")

async function render_superuser_home (req, res) {
    adminmodel.find().then((arr)=>{
      res.render("superuser", {admins:arr})
    })
}

module.exports = render_superuser_home