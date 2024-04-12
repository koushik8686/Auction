
const adminmodel = require("../../models/adminmodel")
async function changepermissions (req, res)  {
    try {
      const adminId = req.params.admin; // Trim the value to remove leading and trailing spaces
      const admin = await adminmodel.findOne({ _id: adminId });
      if (!admin) {
        return res.status(404).send("Admin not found");
      }
      var { user, item, seller } = req.body;
      admin.permissions.users_editing = (user === "on");
      admin.permissions.seller_editing = (seller === "on");
      admin.permissions.items_editing = (item === "on");
  
      await admin.save();
      res.redirect("/superUser/home");
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
  }

module.exports= changepermissions