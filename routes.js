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

//adds game to database
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
    tags : Array.isArray(tags) ? tags : [tags],
    platforms : platforms
  })

  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.title + " saved");
  })

  //game.art.data = fs.readFileSync(req.body.imgPath);
  //game.art.contenType = 'image/png';
  res.end("yes");

});

//sends all of the games in the database
app.get("/browse_games", async (request, response) => {
  const games = await Game.find({});
  
  try {
    response.send(games);
    console.log(games);
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

app.post('/add_review', async (request, response) => {

  var userId = request.body.userId;
  var gameId = request.body.gameId;
  var desc = request.body.desc;
  var rating = request.body.rating;
  
 
  var review = new Review({
    userId: userId,
    gameId : gameId,
    desc: desc,
    rating : rating
  })

 
  review.save(function (err, user){
    if (err) return console.error(err);
    console.log(review + " saved");
  })

  var user = await User.findById(userId).exec();
  console.log(userId)
  user.reviews.push(review);
  user.save(function (err, user){
    if (err) return console.error(err);
    console.log(user.username + " updated, now has reviews: " + user.reviews);
  })

  
  var game = await Game.findById(gameId).exec();
  console.log(game.title);
  game.reviews.push(review);
  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.title + " updated to include review");
  })

  response.end("yes");
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

app.get('/view_game/:id', async (request, response) => {
  var game = Game.findById(request.params.id).populate('reviews').exec(function (err, game){
    if (err) return consol.log(err);
    console.log(game.reviews[0].desc);
  }); 

  response.send(game);
});

module.exports = app;
//remember to remind group to install do "npm i --s concurrently" and "cd frontned; npm install react"
