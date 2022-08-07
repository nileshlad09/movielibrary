const express = require('express')
const cors = require("cors")
const connectToMongo = require('./db')
connectToMongo()
const app = express();
app.use(cors())
app.use(express.json())
const NODE_ENV = "production"
const PORT = 5000
app.use('/api/watchlist',require('./routes/watchlists'))
app.use('/api/watched',require('./routes/watched'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/review',require('./routes/review'))

if(NODE_ENV==="production"){
    app.use(express.static(path.join("frontend/build")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}


app.listen(PORT,()=>{
    console.log("Server running on:",PORT);
})