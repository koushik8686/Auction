const express = require('express')
const router = express.Router()
const {sellingpage_get, sellingpage_post} = require("../../controllers/seller/sell_item")

router.get("/:seller/:itemid",sellingpage_get )
      .post("/:seller/:itemid", sellingpage_post)

module.exports= router