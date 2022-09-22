const express = require("express");
const router = express.Router();
const tutorController = require("../controller/tutor.controller");
let db = require("../config/db.config")



router.post('/signup', (req, res) => {
    try {
        tutorController.signupTutor(req.body).then((user) => {
            res.send(user)
        }).catch((err) => {
            res.status(500)
        })
    }
    catch (err) {
        res.status(500)
    }
})

router.post('/login', (req, res) => {
    try {
        console.log(req.body);
        tutorController.doLogin(req.body).then((doc) => {
            res.send(doc)
        }).catch((err) => {
            if (err == "passincorrect" || "nodoc") {
                return res.status(404)
            } else {
                return res.status(205)
            }
        })
    } catch {
        return res.status(205)
    }

})
module.exports = router