const sellermodel = require("../../models/sellermodel")
const usermodel = require("../../models/usermodel")
const {itemmodel} = require("../../models/itemmodel")
const adminmodel = require("../../models/adminmodel")
async function adminpage_get(req, res) { 
  try {
    console.log( "id" + req.params.id);
    const admin = await adminmodel.findOne({_id:req.params.id});
    if (!admin) {
      return res.status(404).send("Admin not found");
    }
    const users = await usermodel.find();
    const items = await itemmodel.find();
    const sellers = await sellermodel.find();
  
    const data = {
      admin: admin,
      usersdata: users,
      sellersdata: sellers,
      itemsdata: items
    };
  
    console.log(admin);
    res.render("adminpage", { data: data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
  
  }
module.exports=adminpage_get

 
