var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;
const url = 'http://localhost:5000/api/'

// //Example Post Request =========
// postData = {userID : "626d6d4177788fade82dfae5", gameID: "626c096ae6cded8304d01d23"}

// postConfig = {
//     url: 'http://localhost:8000/add_game_to_library',
//     form: postData
// }

// postSuccessHandler = function (err, response, body) {
//     console.log('JSON response from the server: ' + body + ' with status code ' + response.statusCode)
// }
// //Dont uncomment request.post unless you want to actually add data
// request.post(postConfig, postSuccessHandler);
//=============================================

//============Testing all Gets====================
var getTests = true;

//Database
request({url:url+"database"}, function(err, res) {
  if(err) { console.log("Database " + err); return; }
  if(res.statusCode  === 501 || res.statusCode === 200){
      console.log("Database passed successfully")
  } else {
      console.log("Database failed");
      getTests = false;
  }
});
console.log("\n==================\n")

//View Game
request({url:url+'view_game/626ae0464385f275db90f5de'}, function (err, res, body){
    if(err) {console.log("View Game " + err); return;}

    var text = JSON.parse(body)

    if(text.title !== "Doom"){
        getTests = false;
        console.log("Failed to get the correct game")
    } else {
        console.log("Found Doom, passed view_game")
    }
});
console.log("\n==================\n")

//Search Query
request({url:url+'search_game/Doom'}, function (err, res, body){
    if(err) {console.log("Search Query" + err); return;}

    var text = JSON.parse(body)

    if(text.title !== "Doom"){
        getTests = false;
        console.log("Failed to get the correct game")
    } else {
        console.log("Found Doom, passed search_game")
    }
});
console.log("\n==================\n")

//Serve Default Games
request({url:url + 'serve_default_games'}, function (err, res, body){
    if(err) {console.log("Serve default games " + err); return;}

    var text = JSON.parse(body)
    
    if(text["Doom"] !== ""){
        console.log("Found Doom inside of the lists of games")
    } else {
        getTests = false;
        console.log("Failed to find Doom within the list of served_games")
    }
});
console.log("\n==================\n")

//Display User
request({url:url + 'display_user/626d6d4177788fade82dfae5'}, function(err, res, body){
    if(err) {console.log("Display user " + err); return;}

    var text = JSON.parse(body)
    if(text.username === "Gavin the Gav"){
        console.log("Found Gaving the Gav in display user")
    } else {
        getTests = false;
        console.log("Failed to find Gavin the Gav in display user")
    }
})
console.log("\n==================\n")

//Display Profile
request({url:url + 'display_profile/626d6d4177788fade82dfae5'}, function(err, res, body){
    if(err) {console.log("Display Profile " + err); return;}

    var text = JSON.parse(body)
    if(text.username === "Gavin the Gav"){
        console.log("Found Gaving the Gav in displaying profile")
    } else {
        getTests = false;
        console.log("Failed to find Gavin the Gav in displaying profile")
    }
})

if(getTests){
    console.log("Passed GET tests")
} else {
    console.log("Failed GET tests")
}