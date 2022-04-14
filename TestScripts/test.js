var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;

postData = {
    name : "Animal Crossing",
    rating : "5"
}

postConfig = {
    url: 'http://localhost:8000/add_game',
    form: postData
}

console.log(JSON.stringify(postConfig));

postSuccessHandler = function (err, httpResponse, body) {
    console.log('JSON response from the server: ' + body)
}

request.post(JSON.stringify(postConfig), postSuccessHandler);