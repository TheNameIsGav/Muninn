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

//adds game to database
app.post('/add_game', (req, res) => {
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

  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.title + " saved");
  })

    game.save(function (err, game){
      if (err) return console.error(err);
      console.log(game.title + " saved");
    })

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

//assumes req.usernameSearch has the username being searched for 
app.get('/search_users', (req, res) => {
  User.find({username : req.usernameSearch}, (error, data) => {
    if(error) throw error;
    if(data) {
      res.json(result)
    } else {
      res.send(JSON.stringify({
        error : 'Error'
      }))
    }
    
  })
})

app.get('/search_games', (req, res) => {
  User.find({username : req.gameSearch}, (error, data) => {
    if(error) throw error;
    if(data) {
      res.json(result)
    } else {
      res.send(JSON.stringify({
        error : 'Error'
      }))
    }
    
  })
})
module.exports = app;
