
const express = require('express')
const router = express.Router()
const deleteitem = require("../../controllers/admin/deleteitem,")
router.get("/:type/:id/:admin",deleteitem )
module.exports= router