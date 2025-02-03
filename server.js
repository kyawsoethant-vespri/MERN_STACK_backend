const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const recipesRoutes = require("./routes/recipes");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/AuthMiddleware");
const User = require("./models/User");
const cron = require('node-cron');
const nodemailer = require("nodemailer");


//mongoose connection
const URL = process.env.MONGO_URL;
mongoose.connect(URL).then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
        console.log("app is running on localhost : " + process.env.PORT);

        cron.schedule('*/4 * * * * *', async () => {
            console.log('running a task every 4 seconds');
            const user = await User.findByIdAndUpdate('677645b9a6a70208590cbdf5', {
                name: 'mg mg' + Math.random()
            })
        });
    });
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); //for local development

app.use(express.json());
app.use(express.static('public'))

app.use(morgan("dev"));

app.use(cookieParser());

app.get("/", (req, res) => {
    return res.json({hello: "world"});
});

//api routes
app.use("/api/recipes", AuthMiddleware, recipesRoutes);

//api users
app.use("/api/users", userRoutes);

//set cookies
app.get("/set-cookie", (req, res) => {
    // res.setHeader("Set-Cookie", "name=kyawsoethant");
    res.cookie("name", "kyawsoethant");
    res.cookie("importantkey", "danillkharms", {httpOnly: true});
    return res.send("Cookie already sent.");
});

//get cookies
app.get("/get-cookie", (req, res) => {
    const cookies = req.cookies;
    return res.json(cookies);
});

app.get("/send-email", async (req, res) => {
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "3859df60dd6a20",
            pass: "********3d65"
        }
    });

    const info = await transport.sendMail({
        from: 'mgmg@gmail.com', // sender address
        to: 'kyawkyaw@gmail.com', // list of receivers
        subject: "Hello this is email title.", // Subject line
        html: "<h1>Hello world?</h1>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return res.send('Email already sent.');
})
