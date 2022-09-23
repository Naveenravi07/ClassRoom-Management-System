const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
let db = require("../config/db.config")

router.get('/test', (req, res) => {
    console.log("got req from frontend");
    res.json("hiii")
})


router.post('/signup', (req, res) => {
    console.log("req rec");
    console.log(req.body);
    userController.doSignup(req.body).then((details) => {
        res.send(details)
    })
})

router.post('/login', (req, res) => {
    console.log(req.body);
    userController.doLogin(req.body).then((doc) => {
        res.send(doc)
    }).catch((err) => {
        if (err == "passincorrect") {
            res.status(400).send("Invalid Password")
        } else if (err == "nodoc") {
            res.status(404).send("No Account found with this details")
        } else {
            res.status(500).send("Internal server error")
        }
    })
})
module.exports = router;