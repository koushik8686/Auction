const express = require('express')
const router = express.Router()

const {userlogin_get,userlogin_post}= require("../../controllers/user/user_login")

router.get("/", userlogin_get)
      .post("/", userlogin_post)
      
module.exports= router