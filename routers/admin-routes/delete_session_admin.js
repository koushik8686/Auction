const express = require('express')
const router = express.Router()
const {delete_Session} = require("../../middleware/admin-sessions/adminauth")

router.get("/", delete_Session)
    module.exports = router