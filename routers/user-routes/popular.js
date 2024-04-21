const express = require('express')
const router = express.Router()

const render_home= require("../../controllers/user/popularpage")

router.get("/:email", render_home)
      
module.exports= router