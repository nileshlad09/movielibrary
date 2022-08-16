const mongoose = require('mongoose');


const connectToMongo=()=>{
    
    mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/movielibrary', {
    useNewUrlParser: true
    });
}
module.exports = connectToMongo