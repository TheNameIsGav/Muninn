const core = require('@actions/core');
const mongoose = require('mongoose');
const Router = require("./routes");
require('dotenv').config();
const bodyParser = require("body-parser");
const express = require('express');
const Game = require('./Models/Game.js');
const Review = require('./Models/Review.js');
const User = require('./Models/User.js');
const fs = require('fs');
const bcrypt = require('bcrypt')
const path = require('path');
var cors = require('cors');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())

let environment = process.env.environment
let database = "test";
if(environment == "prod"){
  database = "production"
}


const uri = "mongodb+srv://" + process.env.USER_NAME + ":" + process.env.USER_PASSWORD + "@muninn.m3vbg.mongodb.net/"+ database + "?retryWrites=true&w=majority";
// //https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/

//Connects to the server
try{
  mongoose.connect(uri);
} catch (error) {
  console.log(error)
}

var serverConnection = 404

//Tests to see if connection successful
mongoose.connection.on('connected', () => {
  console.log("connected to " + database + " database");
  serverConnection = 201
})

//Checks to see if it fails
mongoose.connection.on('error', function (err) {
  serverConnection = 501
  core.setFailed("Failed connection " + err);
})

//Get request to see if we are connected to the database
app.get('/api/database', async (req, res) => {
  res.end().status(serverConnection);
})

const saltRounds = 12;

//https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex/6969486#6969486
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


/*
display_user - Leah
browse_games 
search_users 
display_profile - Leah
add_library_game - Gabriel 
add_wishlist_game - Gabriel
add_friend - Gabriel
*/

// Put all API endpoints under '/api'


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

//Add a user-defined game to the database
app.post('/api/add_game', async (req, res) => {
  var {title, publisher, tags, platforms} = req.body; 
  
  //Checks to see if all the requirements for the game are in place
  if((title == "") || (publisher == "") || (tag.length == 0) || (platforms == "")) {
    res.end().status(401);
  } else {

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
  }

});

//Add's user to the list of all users
//Returns 401 in the case of a failure, or a 201 with the ID of the user
app.post('/api/add_user', async (req, res) => {

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
            res.end().status(401);
            return console.error(err);
          }
        });
        res.send(user._id).status(201)
    });
  }

});

//Returns 401 in the case of a failure, or a 201 with the ID of the user
app.post('/api/login', async (req, res) => {

  const {username, password, email } = req.body;

  // var user = await User.findOne({username: username}).exec();

  // console.log(user)

  //Figure out if the previous username exists, and if it does, then check the passwords. If they match, send the user
  await User.findOne(
    {username: username}
  ).exec().then(user => {
    if(!user) {
      return res.send("Username not found").status(401);
    } else {
      bcrypt.compare(req.body.password, user.password, (error, result) => {
        
        if(result) {
          res.send(user._id).status(201);
        } else {
          res.send("Password mismatch").status(401);
        }
      });
    }
  });

});



//Add a review to a specific game, by a specific user; has both user and game link to review
app.post('/api/add_review', async (req, res) => {
  var userId = req.body.userId;
  var gameId = req.body.gameId;
  var desc = req.body.desc;
  var rating = req.body.rating;
 
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
  user.reviews.push(review);
  user.save(function (err, user){
    if (err) return console.error(err);
    console.log(user.username + " updated, now has review: " + user.reviews);
  })

  var game = await Game.findById(gameId).exec();
  
  //calculates new average rating
  var num_ratings = game.reviews.length;
  var total_rating = 0;
  if (game.rating) {
    total_rating = game.rating * num_ratings;
  }
  var new_rating = (total_rating + review.rating) / (num_ratings + 1);
  game.rating = new_rating;

  //adds review to array in game document
  game.reviews.push(review);
  
  game.save(function (err, game){
    if (err) return console.error(err);
    console.log(game.title + " updated to include review");
  })
  res.end("yes");
});

//Gets the game along with reviews for a game based on the id of that game
app.get('/api/view_game/:id', async (request, response) => {
  var game = Game.findById(request.params.id).populate('reviews').exec(function (err, game){
    if (err) return console.log(err);
   
  }); 

  response.send(game);
});

//Search for a game with 'search_query' and return the json string of that game - used for displaying the game after a search
app.get('/api/search_game/:search_query', async (request, response) => {

  console.log("hit backend")
  //Original Author: Gabriel
  var search = request.params.search_query.replace("_", " ");
  search = escapeRegExp(search)

  //Builds regex expression to search for similar names based on the query
  var reg = new RegExp(search, 'i')

  var matchingGames = JSON.stringify(await Game.findOne({title: {$regex: reg}}).exec());

  response.send(matchingGames).status(201);
});

//Get and display information about a game via it's ID
app.get('/api/display_game/:id', async(request, response) => {
  var game = Game.findById(request.params.id).exec(function(err, game) {
    if(err) return console.log(err);
  });

  response.send(JSON.stringify(game)).status(201);
});

//Serve a list of games names to the frontend for searching through the database. 
app.get('/api/serve_default_games', async (request, response) => {
  //Original Author: Gabriel
  var gamesComplexArray = await Game.find({}).select('title');

  if(gamesComplexArray.length == 0){
    console.log("we shouldn't have gotten here");
    response.send("").status(504);
  }
//TODO convert this into a dictionary of title: _id
  var gamesSimpleArray = {};

  gamesComplexArray.forEach((x, i) => gamesSimpleArray[x.title] = x._id);

  var retText = JSON.stringify(gamesSimpleArray);

  response.send(retText).status(201);
});

// app.get('/api/passwords', (req, res) => {
//   console.log("hit")
//   const count = 5;

//   // Generate some passwords
//   const passwords = Array.from(Array(count).keys()).map(i =>
//     generatePassword(12, false)
//   )

//   // Return them as json
//   res.json(passwords);

//   console.log(`Sent ${count} passwords`);
// });

app.get('/api/shit', (req, res) => {
  console.log("hit shit")
  res.send("shit");
})

app.post('/api/add_game_to_library', async (req, res) => {
  //Original Author: Gabriel
  const {userID, gameID} = req.body;
  var user = await User.findById(userID);

  user.library.push(gameID)

  user.save(function (err, user) {
    if(err) {
      console.log("Error saving user in adding game to libary")
      res.end().status(401);
    } else {
      console.log("Updated user's library")
      res.end().status(201)
    }
  });

});


//gets user by user id and populates different fields to return all user information
app.get('/api/display_user/:id', async(request, response) => {
  //Original Author: Leah

  var user =  await User.findById(request.params.id).populate('friends reviews wishlist library suggested').exec();
  response.send(JSON.stringify(user));
});

//gets profile to be displayed by user id and populates certain fields to return relevant profile information
app.get('/api/display_profile/:id', async(request, response) => {
  //Original Author: Leah

  //TODO decide what information we want other users to see for each profile 
  var user = await User.findById(request.params.id).populate('friends reviews library').select('username email friends reviews library').exec();
  console.log(user);
  response.send(JSON.stringify(user));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);