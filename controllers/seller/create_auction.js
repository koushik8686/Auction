const sellermodel = require("../../models/sellermodel")
const {itemmodel} = require("../../models/itemmodel")

function createauction_get (req, res) { 
    console.log("req")
  res.render("create" , {k:req.params.seller})
}

function createauction_post(req, res) { 
    var nam = "";
    sellermodel.find().then((arr) => {
        for (let index = 0; index < arr.length; index++) {
            console.log(arr[index]._id, req.params.name, arr[index].email);
            if (arr[index]._id == req.params.seller) {
                console.log("ok");
                nam = arr[index].name;
                var classs =""
                switch (req.body.type) {
                  case "art":
                    classs="black"
                    break;
                  case "antique":
                    classs="blue"
                    break;
                  case "used":
                    classs="red" 
                    break;
                  default:
                    break;
                }
                const item = new itemmodel({
                    name: req.body.name,
                    person: nam,
                    pid: req.params.seller,
                    url: req.body.link,
                    base_price: req.body.price,
                  type:req.body.type,
                  current_price:req.body.price,
                  current_bidder:" ",
                  current_bidder_id:" ",
                  class:classs,
                  aution_over:false,
                  visited_users:[],
                  auction_history: []
                  });
                console.log(item)
                item.save()
                sellermodel.findOne({ _id: req.params.seller })
                .then((user) => {
                  if (user) {
                    // User found, update the items array
                    user.items.push(item); 
                    return user.save();
                  } else {
                    console.log('User not found');
                  }
                })
                .catch((err) => {
                  // console.error('Error updating user:', err);
                });
                return;
            }
        }
    }).catch((error) => {
        // console.error("Error:", error);
    });
  res.redirect("/sellerhome/"+req.params.seller) }

module.exports = {createauction_get , createauction_post}