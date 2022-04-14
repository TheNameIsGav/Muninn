const express = require('express');
const req = require('express/lib/request');
const gameModel = require('./models')
const app = express();

app.get('/', (req, res) => {
    res.render("index");
  });

app.post("/add_game", (request, response) => {
  
    response.send("got a post request: " + request.body);
});

app.get("/games", async (request, response) => {
    const game = await gameModel.find({});
  
    try {
      response.send(game);
    } catch (error) {
      response.status(500).send(error);
    }
  });

module.exports = app;