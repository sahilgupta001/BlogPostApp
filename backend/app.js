const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

mongoose.connect("mongodb+srv://admin:" + process.env.MONGO_ATLAS_PW + "@cluster0-wnd4p.mongodb.net/node-angular")
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(() => {
    console.log("Connection Failed")
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Access-Control-Request-Method, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
