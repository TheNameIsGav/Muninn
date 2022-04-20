const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema ({
    name: {
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
    }],
    platforms: [{
        type: String
    }],
    reviews: [{
        type: Schema.Types.ObjectId, ref: 'Review'
    }]
})

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;