const mongoose= require('mongoose')

const adminschema = mongoose.Schema({
    email:String,
    password:String,
    permissions:{
        viewing:Boolean,
        users_editing:Boolean,
        items_editing:Boolean,
        seller_editing:Boolean
    }
})
const adminmodel = mongoose.model('admins' , adminschema)

module.exports = adminmodel