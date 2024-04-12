const mongoose= require('mongoose')

const superuserschema = mongoose.Schema({
    email:String,
    password:String,
})
const superusermodel = mongoose.model('superusers' , superuserschema)

module.exports = superusermodel