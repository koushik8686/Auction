const express = require('express')
const router = express.Router()
const render_sellerhome = require("../../controllers/seller/seller_home")

router.get("/:id",render_sellerhome )

module.exports= router 