const express = require('express')
const router = express.Router()
const {render_auctionpage, bid} = require("../../controllers/user/user_auction_page")


router.get("/:userid/item/:itemid", render_auctionpage)
       .post("/:userid/item/:itemid" ,bid)
module.exports = router