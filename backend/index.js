const express = require('express')
const cors = require("cors")
const connectToMongo = require('./db')
connectToMongo()
const app = express();
app.use(cors())
app.use(express.json())

const PORT = 7000
app.use('/api/watchlist',require('./routes/watchlists'))
app.use('/api/watched',require('./routes/watched'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/review',require('./routes/review'))


app.listen(PORT,()=>{
    console.log("Server running on:",PORT);
})