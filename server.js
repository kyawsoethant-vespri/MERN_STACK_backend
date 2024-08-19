const express = require("express");
const app = express();
require("dotenv").config();

const morgan = require("morgan");
const recipesRoutes = require("./routes/recipes");
const mongoose = require("mongoose");

//mongoose connection
const URL = process.env.MONGO_URL;
mongoose.connect(URL).then(() => {
  console.log("Connected to database");
  app.listen(process.env.PORT, () => {
    console.log("app is running on localhost : " + process.env.PORT);
  });
});

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.json({ hello: "world" });
});

//api routes
app.use("/api/recipes", recipesRoutes);
