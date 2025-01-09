const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const morgan = require("morgan");
const recipesRoutes = require("./routes/recipes");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");

//mongoose connection
const URL = process.env.MONGO_URL;
mongoose.connect(URL).then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
        console.log("app is running on localhost : " + process.env.PORT);
    });
});

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
})); //for local development

app.use(express.json());

app.use(morgan("dev"));

app.use(cookieParser());

app.get("/", (req, res) => {
    return res.json({hello: "world"});
});

//api routes
app.use("/api/recipes", recipesRoutes);

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
