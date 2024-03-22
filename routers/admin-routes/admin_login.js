
const express = require('express')
const router = express.Router()
const {adminlogin_get , adminlogin_post} = require("../../controllers/admin/admin_login")
router.get("/:seller/:itemid",adminlogin_get )
      .post("/:seller/:itemid", adminlogin_post)

module.exports= router