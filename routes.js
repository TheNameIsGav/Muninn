const express = require('express');
const req = require('express/lib/request');
const bodyParser = require("body-parser");
const {Game, Review} = require('./models')
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render("index");
  });

app.post('/add_game', (req, res) => {
  var name = req.body.name;
  var rating = req.body.rating;
  console.log("Title of the game is: " + name + " and the rating is " + rating);

  var game = new Game({ name: name, rating : rating})
  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.name + " saved");
  })
  res.end("game saved");
});

app.post('/add_review', (req, res) => {
  var userID = req.body.userID;
  var desc = req.body.desc;
  var rating = req.body.rating;
  var gameID = req.body.gameID;

  var review = new Review({userID: userID, gameID: gameID, desc: desc, rating: rating})
  review.save(function (err, review) {
    if(err) return console.error(err)
    console.log(review.userID + " saved")
  })
  res.end("review saved")
})

app.get("/games", async (request, response) => {
  const game = await Game.find({});

  try {
    response.send(game);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/reviews", async (req, res) => {
  const review = await Review.find({});

  try {
    res.send(review);
  } catch (error) {
    res.status(500).send(error);
  }
})


module.exports = app;