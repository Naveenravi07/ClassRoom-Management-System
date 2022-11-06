const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const { Server } = require('socket.io')
let httpServer = require('http').createServer(app,)
let io = new Server(httpServer, { cors: { origin: "*" } })

const userRoute = require("./routes/student.routes");
const tutorRoute = require("./routes/tutor.routes")
// let mainRoute = require("./routes/index.routes")
var db = require("./config/db.config");
var fileupload = require("express-fileupload");
const studentCOntroller = require("./controller/user.controller");
const tutorController = require("./controller/tutor.controller");

// middleware
app.use(express.json());
app.use(fileupload());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


db.connect((err) => {
    if (err) throw err;
    console.log("connected to database");
});

app.use('/student', userRoute)
app.use('/tutor', tutorRoute)
// app.use("/", mainRoute)

const users = {};
const socketToRoom = {};

io.on('connection', async (socket) => {

    socket.on("join_class", (details) => {
        console.log("Joining Class " + details.classid);
        socket.join(details.classid)
        socket.to(details.classid).emit("user_connected", details.userid)
    })

    socket.on("classStreamData", (id) => {
        console.log("Stream Recived in server on PEer " + id);
    })

    socket.on("newStudent", (data) => {
        // data={"id":classid, "peeerid":peer id of the student, "classid":classid, name:"name of student ", owner:owner of the meeting}
        console.log("new Student on waiting list " + data.name);
        socket.join(data.id)
        socket.broadcast.emit('descionPending', { data})
    })

    socket.on("calldeclined", (data) => {
        studentCOntroller.remmoveDuplicateStudent({ "id": data.sid, "classid": data.classid }).then((response) => {
            socket.join(data.classid)
            socket.broadcast.emit("calldecline", { "msg": `Your Call Has Been Declined By The Host`, "classid": data.classid })
        })
    })
});

app.get('/classes', (req, res) => {
    console.log("req recived");
})

const PORT = process.env.PORT || 1080;
httpServer.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));