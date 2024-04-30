const sellermodel =  require("../../models/sellermodel")
const {itemmodel} =  require("../../models/itemmodel")
const {set_sellersession, get_sellersession } = require("../../middleware/seller-sessions/sellerauth")

const path = require("path");

function sellerlogin_get(req, res) { 
  if (get_sellersession(req)) {
    return res.redirect("/sellerhome/"+get_sellersession(req));
   }
    res.sendFile(path.join(__dirname, "../../views/sellerlogin.html"));
}
function sellerlogin_post(req, res) { 
  var email = req.body.email;
  var pass = req.body.pass;

  // Find the seller with the provided email
  sellermodel.findOne({ email: email }).then((seller) => {
      if (!seller) {
          // If no seller is found with the provided email, redirect to seller registration page
          return res.redirect("/sellerregister");
      }

      // Check if the provided password matches the seller's password
      if (seller.password !== pass) {
          // If the passwords don't match, send a response indicating wrong password
          return res.send("Wrong password. Please try again.");
      }
      set_sellersession(req, seller._id);

      // Redirect to the seller's home page
      res.redirect("/sellerhome/" + seller._id);
  }).catch((error) => {
      console.error("Error finding seller:", error);
      res.status(500).send("Internal Server Error");
  });
}


module.exports = {sellerlogin_get, sellerlogin_post}