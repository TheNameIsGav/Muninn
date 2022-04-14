const core = require('@actions/core');
const express = require('express');
const path = require('path');
require('./Database/database.js')
const mongoose = require('mongoose');

//NodeJS Server Setup
const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render("index");
});

mongoose.connection.on('connected', () => {
  console.log('connected');
})

mongoose.connection.on('error', function (err) {
  console.log("Failed to connect with error " + err);
  core.setFailed("Failed connection " + err);
})

app.listen(port, ()=>{
  console.log("listening at http://localhost:/" + port)
})