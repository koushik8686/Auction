const sellermodel = require("../../models/sellermodel")
const usermodel = require("../../models/usermodel")
const {itemmodel} = require("../../models/itemmodel")

async function deleteitem(req, res) 
{ 
console.log("deleting item");
    switch (req.params.type) {
      case "user":
        await usermodel.findByIdAndDelete(req.params.id);
        res.redirect("/adminpage")
        break;
      case "seller":
      await sellermodel.findOne({_id:req.params.id}).then(async(arr)=>{
        for (let i = 0; i < arr.items.length; i++) {
         await itemmodel.findByIdAndDelete(arr.items[i]._id) 
        }
      })  
      await sellermodel.findByIdAndDelete(req.params.id);
        res.redirect("/adminpage")
        break;
      case "item":
        const itemId = req.params.id;
  
        // Find the item by ID and get the seller ID (arr.pid)
        const item = await itemmodel.findOne({ _id: itemId });
        if (!item) {
          return res.status(404).send("Item not found");
        }
    
        const sellerId = item.pid;
    
        // Update the seller model to remove the item from the items array
        await sellermodel.findOneAndUpdate(
          { _id: sellerId },
          { $pull: { items: { _id: itemId } } },
          { new: true }
        );
        await itemmodel.findByIdAndDelete(itemId);
    
        res.redirect("/adminpage")
        break;
      default:
        break;
    }
}

module.exports= deleteitem