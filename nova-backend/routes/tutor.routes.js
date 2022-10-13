const express = require("express");
const router = express.Router();
const tutorController = require("../controller/tutor.controller");
let db = require("../config/db.config")
let fs = require("fs")
let fileupload = require("express-fileupload")

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

router.post('/uploadImage', (req, res) => {
    let clientimg = req.files.file;
    let id = tutorController.createHexaCode()
    clientimg.mv('./public/images/Alliances/' + id + '.jpg', (err) => {
        if (err) {
            res.status(500).send("Image Failed To Upload")
        } else {
            res.send({
                "id": id
            })
        }
    })
})

router.post('/create-alliance', (req, res) => {
    tutorController.createAlliance(req.body).then((resAlc) => {
        console.log(resAlc);
        res.json(resAlc)
    }).catch((err) => {
        if (err == "servererr") {
            res.status(500).send("Internal Server Error")
        } else {
            res.status(500).send("Internal Server Error")
        }
    })
})
router.post('/alliances', (req, res) => {
    tutorController.getAlliances(req.body).then((response) => {
        res.send(response)
    })
})

router.post('/invitestudent', async (req, res) => {
    console.log("req endpoint");
    await tutorController.generateInviteLink(req.body).then((data) => {
        res.send(data)
    })
})


router.post("/create-class", (req, res) => {
    tutorController.createClass(req.body).then((response) => {
        res.send(response)
    }).catch((err) => {
        res.status(500).send("Internal Server Error")
    })
})

router.post('/getClasses', (req, res) => {
    console.log(req.body.id);
    tutorController.getClasses(req.body.id).then((result) => {
        res.send(result)
    })
})

module.exports = router