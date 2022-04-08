const core = require('@actions/core');

//NodeJs Server Setup
var http = require('http');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

let app = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('Class said subjugation');
})

app.listen(port);