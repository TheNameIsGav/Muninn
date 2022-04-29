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

/*
display_user
display_game
browse_games
search_users
display_profile
add_library_game
add_wishlist_game
add_friend
*/


//Default renderer, but I am p sure that we don't use this?
app.get('/', (req, res) => {
    res.render("index");
  });

//Add a user-defined game to the database
app.post('/add_game', async (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  var publisher = req.body.publisher;
  var tags = req.body.tags;
  var platforms = req.body.platforms; 

  var game = new Game({
    title: title, 
    description : description,
    publisher: publisher,
    tags : Array.isArray(tags) ? tags : [tags],
    platforms : platforms
  })
  
  game.art.data = fs.readFileSync(req.body.imgPath);
  game.art.contenType = 'image/png';
  
//Detect if a previous game exists
  var search = escapeRegExp(title)
  var reg = new RegExp(search, 'i')
  var value = await Game.findOne({title: {$regex: reg}}).exec()

  if(value == null){
    game.save(function (err, game){
      if (err) return console.error(err);
      console.log(game.title + " saved");
    });

    res.end("saved game to database");
  } else {
    res.end("We found a game similar to your search term of " + title + " [" + value.id + "]")
  }

});

//Add's user to the list of all users TODO figure out password hashing and prevent conflicting users
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

//Add a review to a specific game, by a specific user
app.post('/add_review', (req, res) => {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  var desc = req.body.desc;
  var rating = req.body.rating;
  
  console.log("Username: " + username);
  console.log("Email: " + email);
 
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
  res.end("yes");
});


//Search for a game with 'search_query' and return the json string of that game
app.get('/search_game/:search_query', async (request, response) => {
  //Original Author: Gabriel
  var search = request.params.search_query.replace("_", " ");
  search = escapeRegExp(search)

  //Builds regex expression to search for similar names based on the query
  var reg = new RegExp(search, 'i')
  var matchingGames = JSON.stringify(await Game.findOne({title: {$regex: reg}}).exec());

  response.send(matchingGames);
});

//Serve a list of games names to the frontend for searching through the database. 
app.get('/serve_default_games', async (request, response) => {

  var gamesComplexArray = await Game.find({}).select('title');

  if(gamesComplexArray.length == 0){
    console.log("we shouldn't have gotten here");
    response.send("");
  }
//TODO convert this into a dictionary of title: _id
  var gamesSimpleArray = [];

  gamesComplexArray.forEach((x, i) => gamesSimpleArray.push(x.title));

  var retText = JSON.stringify(gamesSimpleArray);

  response.send(retText);
});

//Older version of serve_default_games
// //sends all of the games in the database
// app.get("/browse_games", async (request, response) => {
//   const games = await Game.find({});
  
//   try {
//     response.send(games);
//     console.log(games);
//   } catch (error) {
//     response.status(500).send(error);
// >>>>>>> viewGameLeahModels
//   }
// });


module.exports = app;
//https://expressjs.com/en/guide/routing.html