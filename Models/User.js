const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    friends: [{
        type: Schema.Types.ObjectId, ref: 'User'
    }],
    reviews: [{
        type: Schema.Types.ObjectId, ref: 'Review'
    }],
    wishlist: [{
        type: Schema.Types.ObjectId, ref: 'Game'
    }],
    library: [{
        type: Schema.Types.ObjectId, ref: 'Game'
    }],
    suggested: [{
        type: Schema.Types.ObjectId, ref: 'Game'
    }],
    tags: [{
        type: String
    }]
})

const User = mongoose.model('User', UserSchema);
module.exports = User;