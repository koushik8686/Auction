const express = require('express')
const router = express.Router()
const  {createauction_get , createauction_post} = require("../../controllers/seller/create_auction")

router.get("/",createauction_get )
      .post("/", createauction_post)

module.exports= router