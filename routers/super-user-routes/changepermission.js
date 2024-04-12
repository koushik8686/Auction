const express = require('express')
const router = express.Router()
const changepermissions = require("../../controllers/super-user/changepermission")

router.post("/:admin", changepermissions)
      
module.exports= router