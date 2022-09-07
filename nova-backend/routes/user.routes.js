const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
let db = require("../config/db.config")

router.get('/test', (req, res) => {
    console.log("got req from frontend");
    res.json("hiii")
})

module.exports = router;