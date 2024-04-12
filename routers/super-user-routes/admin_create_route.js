const express = require('express')
const router = express.Router()
const {admincreate_get, admincreate_post} = require("../../controllers/super-user/admincreation")

router.get("/", admincreate_get)
      .post("/", admincreate_post)
      
module.exports= router