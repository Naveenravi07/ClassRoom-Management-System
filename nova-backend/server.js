const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const userRoute = require("./routes/student.routes");
const tutorRoute = require("./routes/tutor.routes")
let mainRoute = require("./routes/index.routes")
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
app.use("/", mainRoute)

const PORT = process.env.PORT || 1080;
app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));