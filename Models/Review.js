const mongoose = require("mongoose");
const { Schema } = mongoose;


const ReviewSchema = new Schema({
    user : {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    game: {
        type: Schema.Types.ObjectId, ref: 'Game'
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }

})

const Review = mongoose.model("Review", ReviewSchema)
module.exports = Review;
