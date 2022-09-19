const express = require("express");
const router = express.Router();
const tutorController = require("../controller/tutor.controller");
let db = require("../config/db.config")



router.post('/signup', (req, res) => {
    let data = req.body

    tutorController.signupTutor(data).then((user) => {
        res.send(user)
    }).catch((err) => {
        res.status(400)
    })
})

router.post('/login', (req, res) => {
    console.log(req.body);
    tutorController.doLogin(req.body).then((doc) => {
        res.send(doc)
    })
})
module.exports = router