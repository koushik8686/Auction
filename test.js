const mongoose = require('mongoose');
const {itemschema} = require("./models/itemmodel")
const userschema = mongoose.Schema({
    email:String,
    password:String,
    items:[itemschema],
    isremoved:Boolean
})
const usermodel = mongoose.model("userdetails",userschema)
mongoose.connect("mongodb+srv://koushik:koushik@cluster0.h2lzgvs.mongodb.net/fsd-project");

usermodel.updateMany({}, { $set: { isremoved:false } })
    .then(() => {
        console.log("All items updated successfully.");
    })
    .catch((error) => {
        console.error("Error updating items:", error);
    });
