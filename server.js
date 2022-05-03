const core = require('@actions/core');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require("./routes");
const path = require('path');
require('dotenv').config();
const bodyParser = require("body-parser");

//NodeJS Server Setup
const app = express();
app.use(cors());

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

let environment = process.env.environment
let database = "test";
if(environment == "prod"){
  database = "production"
}

app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(express.json());
app.use("/", Router);

const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/"+ database + "?retryWrites=true&w=majority";
//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/

//Connects to the server
mongoose.connect(uri);

//Tests to see if connection successful
mongoose.connection.on('connected', () => {
  console.log("connected to " + database + " database");
})

//Checks to see if it fails
mongoose.connection.on('error', function (err) {
  core.setFailed("Failed connection " + err);
})

app.listen(port, ()=>{
  console.log("listening at http://localhost:/" + port)
})