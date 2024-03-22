const express = require('express')
const router = express.Router()
const {sellerlogin_get,sellerlogin_post } = require("../../controllers/seller/seller_login")

router.get("/", sellerlogin_get)
      .post("/", sellerlogin_post)
      
module.exports= router