const mongoose = require('mongoose')
const {Schema} = mongoose

const WatchlistSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    movieId:{
        type:Number,
        required:true
    },
    movieName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
WatchlistSchema.index({ user: 1, movieId: 1}, { unique: true });

const Watchlist = mongoose.model('watchlist',WatchlistSchema);
module.exports = Watchlist