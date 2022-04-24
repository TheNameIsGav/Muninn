import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import Navbar from './components/Navbar/Navbar';

// var request = require("request"); //needed for post request

ReactDOM.render(<App/>,
  document.getElementById('root')
);

// var searchInformation = { searchTerm: Navbar.value}

// var postConfig = {
//   url: 'http://localhost:8000/search_game',
//   form: searchInformation
// }

// var postSuccessHandler = function (err, httpResponse, body) {
//   console.log('JSON response from the server: ' + body)
// }

// // request.post(postConfig, postSuccessHandler);


// request({url:"http://localhost:8000/search_game/just dance"}, function(err, response, body) {
//   if(err) { console.log(err); return; }
//   console.log("Get response code " + response.statusCode + " with text: " + response.body);
// });

