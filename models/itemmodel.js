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
    aution_active:Boolean
  })

const itemmodel = mongoose.model("items", itemschema)

module.exports= {
    itemschema,
    itemmodel
}