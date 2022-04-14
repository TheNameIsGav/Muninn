const mongoose = require("mongoose");
const { Schema } = mongoose;


const ReviewSchema = new Schema({
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

const Review = mongoose.model("Review", ReviewSchema)
module.exports = Review;
