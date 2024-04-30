const sellermodel = require("../../models/sellermodel")
const {itemmodel} = require("../../models/itemmodel")

function render_sellerhome (req, res) { 
   sellermodel.findOne({ _id: req.params.id })
        .then((seller) => {
            if (!seller) {
                return res.status(404).send("Seller not found");
            }

            itemmodel.find({ _id: { $in: seller.items } })
                .then((items) => {
                    res.render("sellerhome", { seller: seller, items: items });
                })
                .catch((error) => {
                    console.error("Error finding items:", error);
                    res.status(500).send("Internal Server Error");
                });
        })
   }

module.exports = render_sellerhome