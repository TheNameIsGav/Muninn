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

const ReviewSchema = new mongoose.Schema({
    userID : {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
})

const Game = mongoose.model("Game", GameSchema);
const Review = mongoose.model("Review", ReviewSchema)

module.exports = Game, Review;