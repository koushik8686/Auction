const express = require('express')
const router = express.Router()
const render_items = require("../../controllers/user/user_items")

router.get("/:id", render_items)

module.exports = router