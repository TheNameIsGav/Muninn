var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;

postData = {name : "Doom", rating : "5", id: 001}
testReview = {userID: 001,  gameID: 001, desc: "I hate this game, it goes aobsoasobalsblasbl", rating: 5,}

postConfig = {
    url: 'http://localhost:8000/add_game',
    form: postData
}

reviewConfig = {
    url: 'http://localhost:8000/add_review',
    form: testReview
}

postSuccessHandler = function (err, httpResponse, body) {
    console.log('JSON response from the server: ' + body)
}

request.post(postConfig, postSuccessHandler);
request.post(reviewConfig, postSuccessHandler);