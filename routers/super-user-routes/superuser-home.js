const express = require('express')
const router = express.Router()
const render_superuser_home = require("../../controllers/super-user/superuser_home")

router.get("/", render_superuser_home)
     
module.exports= router