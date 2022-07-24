const mongoose = require('mongoose')
const {Schema} = mongoose

const WatchedSchema = new Schema({
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
WatchedSchema.index({ user: 1, movieId: 1}, { unique: true });
const Watched = mongoose.model('watched',WatchedSchema);
module.exports = Watched