var request = require('request'),
postData = {},
postConfig = {},
postSuccessHandler = null;



postData = {
    title : "Just Dance", 
    description : "Dance",
    publisher: "Ubisoft",
    platforms: ["Wii", "Wii U", "Playstation", "Xbox"],
    tags: ["dance", "music", "active"],
    imgPath: "uploads/Justdance_pink_logo.png"
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