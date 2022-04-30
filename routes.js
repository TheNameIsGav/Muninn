const express = require('express');
const req = require('express/lib/request');
const bodyParser = require("body-parser");
const Game = require('./Models/Game.js');
const Review = require('./Models/Review.js');
const User = require('./Models/User.js');
const fs = require('fs');
const bcrypt = require('bcrypt')
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const saltRounds = 12;

//https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/*
display_user
browse_games
search_users
display_profile
add_library_game - Gabriel 
add_wishlist_game - Gabriel
add_friend - Gabriel
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
app.post('/add_user', async (req, res) => {

  const {username, password, email} = req.body;

  //Search for an existing user, and if found and username or email matches, return "User already exists"

  var potentialUsers = await User.find({$or:[{username:username}, {email:email}]}).exec();

  if(potentialUsers.length != 0){
    console.log("Email or username already appears in database");
    res.send("Found previously existing user").status(201);
  } else {

    //Make new user
    //Hash password, then save new account
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      
        var user = new User({
          username: username,
          password : hash,
          email: email
        })
  
        user.save(function (err, user){
          if (err) {
            res.end("Failed to save user")
            return console.error(err);
          }
        });
        res.send(user).status(201)
    });
  }

});

app.post('/login', async (req, res) => {
  const {username, password, email } = req.body;

  //Figure out if the previous username exists, and if it does, then check the passwords. If they match, send the user
  await User.findOne(
    {username: username, email: email}
  ).exec().then(user => {
    if(!user) {
      return res.send("Username or Email not found").status(401);
    } else {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        if(result) {
          res.send(user);
        } else {
          return res.send("Password mismatch").status(401);
        }
      });
    }
  });

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

//Gets the reviews for a game based on the id of that game
app.get('/view_game/:id', async (request, response) => {
  var game = Game.findById(request.params.id).populate('reviews').exec(function (err, game){
    if (err) return console.log(err);
    console.log(game.reviews[0].desc);
  }); 

  response.send(game);
});

//Search for a game with 'search_query' and return the json string of that game - used for displaying the game after a search
app.get('/search_game/:search_query', async (request, response) => {
  //Original Author: Gabriel
  var search = request.params.search_query.replace("_", " ");
  search = escapeRegExp(search)

  //Builds regex expression to search for similar names based on the query
  var reg = new RegExp(search, 'i')
  var matchingGames = JSON.stringify(await Game.findOne({title: {$regex: reg}}).exec());

  response.send(matchingGames);
});

//Get and display information about a game via it's ID
app.get('/display_game/:id', async(request, response) => {
  var game = Game.findById(request.params.id).exec(function(err, game) {
    if(err) return console.log(err);
  });

  response.send(JSON.stringify(game));
});

//Serve a list of games names to the frontend for searching through the database. 
app.get('/serve_default_games', async (request, response) => {
  //Original Author: Gabriel
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
