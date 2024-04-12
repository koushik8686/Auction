const express = require('express')
const router = express.Router()
const {superuserlogin_get,superuserlogin_post } = require("../../controllers/super-user/superuser_login")

router.get("/", superuserlogin_get)
      .post("/", superuserlogin_post)
      
module.exports= router
