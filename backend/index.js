const express = require('express')
const cors = require("cors")
const connectToMongo = require('./db')
require('dotenv').config()
connectToMongo()
const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080; // Step 1
app.use('/api/watchlist',require('./routes/watchlists'))
app.use('/api/watched',require('./routes/watched'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/review',require('./routes/review'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'frontend/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
    });
}


app.listen(PORT,()=>{
    console.log("Server running on:",PORT);
})