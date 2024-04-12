const express = require('express')
const router = express.Router()
const {delete_Session} = require("../../middleware/user-cookies/userauth")

router.get("/", delete_Session)
    module.exports = router