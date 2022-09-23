const express = require("express");
const router = express.Router();
const tutorController = require("../controller/tutor.controller");
let db = require("../config/db.config")



router.post('/signup', (req, res) => {
    try {
        tutorController.signupTutor(req.body).then((user) => {
            res.send(user)
        }).catch((err) => {
            if (err == "accexists") {
                res.status(403).send("Account Already Exists With This Email")
            } else {
                res.status(500).send("Internal server error")
            }
        })
    }
    catch (err) {
        res.status(500).send("Internal server error")
    }
})

router.post('/login', (req, res) => {
    try {
        console.log(req.body);
        tutorController.doLogin(req.body).then((doc) => {
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
    } catch {
        res.status(500).send("Server Failed To Respond")
    }

})
module.exports = router