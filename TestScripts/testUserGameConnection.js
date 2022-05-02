var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;

//Example Post Request =========
postData = {userID : "626d6d4177788fade82dfae5", gameID: "626c096ae6cded8304d01d23"}

postConfig = {
    url: 'http://localhost:8000/add_game_to_library',
    form: postData
}

postSuccessHandler = function (err, response, body) {
    console.log('JSON response from the server: ' + body + ' with status code ' + response.statusCode)
}
//Dont uncomment request.post unless you want to actually add data
request.post(postConfig, postSuccessHandler);
//=============================================


//Example Get Request =========================
//url/search_game is the router, and then /just dance is the query. Also can use things like /animal crossing, /doom, etc
//As of april 23rd at noon, just dance is the only thing in the test database
// request({url:"http://localhost:8000/search_game/just dance"}, function(err, response, body) {
//   if(err) { console.log(err); return; }
//   console.log("Get response code " + response.statusCode + " with text: " + response.body);
// });

//================================================