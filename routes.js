const express = require('express');
const req = require('express/lib/request');
const bodyParser = require("body-parser");
const Game = require('./Models/Game.js');
const Review = require('./Models/Review.js');
const User = require('./Models/User.js');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render("index");
  });

app.post('/add_game', (req, res) => {
  var name = req.body.name;
  var description = req.body.description;
  var publisher = req.body.publisher;
  var tags = req.body.tags;
  var platforms = req.body.platforms; 
  console.log("Title of the game is: " + name + " and the description is " + description);
  console.log("Platforms: " + JSON.stringify(platforms));
  console.log("Tags: " + JSON.stringify(tags))


  var game = new Game({
    name: name, 
    description : description,
    publisher: publisher,
    tags: tags,
    platforms : platforms
  })
  console.log(game.name)

  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.name + " saved");
  })
  res.end("yes");

});

app.get("/games", async (request, response) => {
  const game = await Game.find({});

  try {
    response.send(game);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;