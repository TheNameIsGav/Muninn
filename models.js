const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    rating: {
        type: Number, 
        default: 0,
    },
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;