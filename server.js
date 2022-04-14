const core = require('@actions/core');
const express = require('express');
const path = require('path');

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



app.listen(port, ()=>{
  console.log("listening at http://localhost:/" + port)
})