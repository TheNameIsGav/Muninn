var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;



postData = {
    title : "Doom Eternal", 
    description : "The Doom Slayer spends his time in hell surviving and murdering legions of demons which earns him the title of Doom Slaye",
    publisher: "Bethesda Softworks",
    platforms: ["Microsoft Windows", "Playstation 4", "Stadia", "Xbox One", "Nintendo Switch", "Playstation 5", "Xbox Series X/S"],
    tags: ["fps", "singleplayer", "multiplayer"],
    imgPath: "uploads/Doom_Eternal.png"
}

postConfig = {
    url: 'http://localhost:8000/add_game',
    form: postData
}

postSuccessHandler = function (err, httpResponse, body) {
    console.log('JSON response from the server: ' + body)
}

request.post(postConfig, postSuccessHandler);
request('http://localhost:8000/games', postSuccessHandler)