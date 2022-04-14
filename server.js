const core = require('@actions/core');
const express = require('express');
const mongoose = require('mongoose');
const Router = require("./routes");
const path = require('path');
require('dotenv').config();
//const dbFile = require('./Database/database.js');


//NodeJS Server Setup
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(Router);

const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/test?retryWrites=true&w=majority";
//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/

//Connects to the server
mongoose.connect(uri);

//Tests to see if connection successful
mongoose.connection.on('connected', () => {
  console.log('connected');
})

//Checks to see if it fails
mongoose.connection.on('error', function (err) {
  core.setFailed("Failed connection " + err);
})

app.listen(port, ()=>{
  console.log("listening at http://localhost:/" + port)
})