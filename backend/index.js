require('dotenv').config()
const express = require('express')
const cors = require("cors")
const connectToMongo = require('./db')

connectToMongo()
const app = express();
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT
app.use('/api/watchlist',require('./routes/watchlists'))
app.use('/api/watched',require('./routes/watched'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/review',require('./routes/review'))


if(process.env.NODE_ENV==="production"){
      app.use(express.static(path.join("frontend/build")))  
}

app.listen(PORT,()=>{
    console.log("Server running on:",PORT);
})