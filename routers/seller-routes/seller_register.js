const express = require('express')
const router = express.Router()
const {sellerregister_get,sellerregister_post } = require("../../controllers/seller/seller_register")

router.get("/", sellerregister_get)
      .post("/", sellerregister_post)
      
module.exports= router