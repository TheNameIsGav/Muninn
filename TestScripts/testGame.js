var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;

postData = {
    title : "League of Legends", 
    description : "A 2009 multiplayer online battle arena video game developed and published by Riot Games.",
    publisher: "Riot Games",
    platforms: ["Microsoft Windows", "OS X"],
    tags: ["moba", "multiplayer", "competitive"],
    imgPath: "uploads/LOL.png"
}

postConfig = {
    url: 'http://localhost:8000/add_game',
    form: postData
}

postSuccessHandler = function (err, httpResponse, body) {
    console.log('JSON response from the server: ' + body)
}

request.post(postConfig, postSuccessHandler);