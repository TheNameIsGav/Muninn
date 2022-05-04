const express = require('express');
const req = require('express/lib/request');
const bodyParser = require("body-parser");
const Game = require('./Models/Game.js');
const Review = require('./Models/Review.js');
const User = require('./Models/User.js');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

app.get('/', (req, res) => {
    res.render("index");
  });


app.post('/add_game', (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var publisher = req.body.publisher;
  var tags = req.body.tags;
  var platforms = req.body.platforms; 
  //var artData = fs.readFileSync(req.body.imgPath);
 //var artContentType = 'image/png';

  console.log("Title of the game is: " + title + " and the description is " + description);
  console.log("Platforms: " + req.body.platforms);
  console.log("Tags: " + req.body.tags);


  var game = new Game({
    title: title, 
    description : description,
    publisher: publisher,
    tags : tags,
    platforms : platforms
  })
  
  game.art.data = fs.readFileSync(req.body.imgPath);
  game.art.contenType = 'image/png';
  

  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.title + " saved");
  })
  console.log(game.art.data);

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


//https://expressjs.com/en/guide/routing.html

//Usage: Append the search query to the "search_game" route and code will return json of closest matching game from database
app.get('/search_game/:search_query', async (request, response) => {
  var search = request.params.search_query.replace("_", " ");
  search = escapeRegExp(search)
  console.log(search)

  //Builds regex expression to search for similar names based on the query
  var reg = new RegExp(search, 'i')
  var matchingGames = JSON.stringify(await Game.find({title: {$regex: reg}}).exec());

  response.send(matchingGames);
});

module.exports = app;
//remember to remind group to install do "npm i --s concurrently" and "cd frontend; npm install react"