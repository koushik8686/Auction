const mongoose= require('mongoose')

const itemschema= mongoose.Schema({
    name:String,
    person:String,
    pid:String,
    url:String,
    base_price:Number,
    current_bidder:String,
    current_bidder_id:String,
    current_price:String,
    type:String,
    class:String, 
    aution_active:Boolean,
    visited_users:[{id:String ,email:String}],
    auction_history: [{bidder: String,price: String}]
  })


const itemmodel = mongoose.model("items", itemschema)

module.exports= {
    itemschema,
    itemmodel
}
