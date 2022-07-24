const mongoose = require('mongoose')
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type:String,
        required:true
    },
    movieId:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Review = mongoose.model('review',ReviewSchema);
module.exports = Review