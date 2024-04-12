const adminpage_get = require("../../controllers/admin/admin_homepage")
const express = require('express')
const router = express.Router()

router.get("/:id",adminpage_get )
module.exports= router