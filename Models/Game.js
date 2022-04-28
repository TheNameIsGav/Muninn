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
    art: {
        data: Buffer,
        contentType: String
    },
    tags: [{
        type: String,
        enum: ["beginner", "advanced", "sports", "action", "adventure", "strategy", "puzzle", "role-play", "simulation", "competetive", "cooperative", "fighting", "music", "dance", "social", "multiplayer", "singleplayer", "calming", "fps"]
    }],
    platforms: [{
        type: String
    }],
    reviews: [{
        type: Schema.Types.ObjectId, ref: 'Review'
    }],
    rating: {
        type: Number
    }
})


const Game = mongoose.model('Game', GameSchema);
module.exports = Game;