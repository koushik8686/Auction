const adminpage_get = require("../../controllers/admin/admin_homepage")
const express = require('express')
const router = express.Router()

router.get("/",adminpage_get )
module.exports= router