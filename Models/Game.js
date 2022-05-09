const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    developer: {
        type: String
    },
    tags: [{
        type: String,
        enum: ["beginner", "advanced", "sports", "action", "adventure", "strategy", "puzzle", "role-play", "simulation", "competitive", "cooperative", "fighting", "music", "dance", "social", "multiplayer", "singleplayer", "calming", "fps", "moba"]
    }],
    platforms: [{
        type: String
    }],
    reviews: [{
        type: Schema.Types.ObjectId, ref: 'Review',
        default: []
    }],
    rating: {
        type: Number,
    }
})


const Game = mongoose.model('Game', GameSchema);
module.exports = Game;