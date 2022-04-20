const express = require('express');
const req = require('express/lib/request');
const bodyParser = require("body-parser");
const Game = require('./Models/Game.js');
const Review = require('./Models/Review.js');
const User = require('./Models/User.js');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
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
  console.log("Platforms: " + req.body.platforms);
  console.log("Tags: " + req.body.tags);


  var game = new Game({
    name: name, 
    description : description,
    publisher: publisher,
    tags : tags,
    platforms : platforms
  })
  
  

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
    console.log(game);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/add_user', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  
  console.log("Username: " + username);
  console.log("Email: " + email);
 
  var user = new User({
    username: username,
    //need to figure out password stuff 
    password : password,
    email: email
  })

  user.save(function (err, user){
    if (err) return console.error(err);
    console.log(user.username + " saved");
  })
  res.end("yes");
});

app.post('/add_review', (req, res) => {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  var desc = req.body.desc;
  var rating = req.body.rating;
  
  console.log("Username: " + username);
  console.log("Email: " + email);
 
  var review = new Review({
    user: userId,
    //need to figure out password stuff 
    game : gameId,
    desc: desc,
    rating : rating
  })



  review.save(function (err, user){
    if (err) return console.error(err);
    console.log(review + " saved");
  })
  res.end("yes");
});

module.exports = app;