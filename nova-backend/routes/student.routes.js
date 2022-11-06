const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller");
let db = require("../config/db.config");
const { response } = require("express");
const tutorController = require("../controller/tutor.controller");

router.get('/test', (req, res) => {
    console.log("got req from frontend");
    res.json("hiii")
})


router.post('/signup', (req, res) => {
    console.log("req rec");
    console.log(req.body);
    userController.doSignup(req.body).then((details) => {
        res.send(details)
    }).catch((err) => {
        if (err == "accexists") {
            res.status(403).send("Account Already Exists With This Email")
        } else {
            res.status(500).send("Internal server error")
        }
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

router.post("/alliances", (req, res) => {
    userController.getAlliances(req.body).then((result) => {
        res.send(result)
    })
})

router.post('/join-alliance', async (req, res) => {
    console.log(req.body);
    await userController.joinAlliance(req.body).then((result) => {
        res.send(result)
    }).catch((err) => {
        if (err == "invalidLink") {
            res.status(404).send("Invalid Invite Link")
        } else if (err == "already joined") {
            res.status(400).send("You Are Already In This Alliance")
        }
    })
})

router.post('/getClasses', (req, res) => {
    try {
        userController.getClasses(req.body).then((response) => {
            res.send(response)
        })
    } catch (err) {
        res.status(500).send("Internal server error")
    }

})

router.post('/addStudenttoClass', (req, res) => {
    userController.remmoveDuplicateStudent(req.body).then((respo) => {
        userController.addStudentDetailsToClass(req.body).then((response) => {
            res.send(response)
        })
    })

})

router.post('/removeStudentFromClass',(req,res)=>{
    console.log(req.body);
    // Remove Duplicate Student Can Do Our Purpose Here  No Need To Create New Function
    userController.remmoveDuplicateStudent({"classid":req.body.classid,"id":req.body.sid}).then((response)=>{
        res.send(response)
    })
})

router.post('/getAttendence',(req,res)=>{
    tutorController.getClassInfo({"id":req.body.id}).then((respo)=>{
        res.send(respo)
    })
})


module.exports = router;