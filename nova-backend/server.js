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

io.on('connection', (socket) => {

    socket.on("join_class", (details) => {
        console.log("Joining Class " + details.classid);
        socket.join(details.classid)
        socket.to(details.classid).emit("user_connected",details.userid)
    })

    socket.on("classStreamData",(id)=>{
        console.log("Stream Recived in server on PEer "+id );
    })
});

app.get('/classes', (req, res) => {
    console.log("req recived");
})

const PORT = process.env.PORT || 1080;
httpServer.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));