const mongoose = require('mongoose')
const {itemschema} = require("./itemmodel")

const userschema = mongoose.Schema({
    email:String,
    password:String,
    items:[itemschema],
    isremoved:Boolean
})
const usermodel = mongoose.model("userdetails",userschema)
module.exports =usermodel