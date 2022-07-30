const express = require('express')
const Watchlist = require("../models/Watchlist")
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

// route 1: add movie to watchlist
router.post('/addwatchlist',fetchuser,async (req,res)=>{
  try {
    const movie = await Watchlist.create({
        user: req.user.id,
        movieId: req.body.movieId,
        movieName: req.body.movieName,
        typeOfContent: req.body.typeOfContent
      });
      success=true
     res.status(200).json({ success, msg: "movie added successfully" });
  } catch (error) {
    return res.json(error);
  }
})

// route 2: delete movies from watchlist
router.delete('/deletewatchlist/:id',fetchuser,async(req,res)=>{
  try {
    movie= await Watchlist.findById(req.params.id);
    if(!movie){
      return res.status(404).send("Not found")
    }
    if(movie.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed");
    }   
    movie = await Watchlist.findByIdAndDelete(req.params.id);
    res.send(movie)
    
  } catch (error) {
    console.error(error.message);
    res.send("Internal server error")
  }
})

// route 3: get All movies of watchlist
router.get('/getwatchlistM',fetchuser,async(req,res)=>{
  try {
    const user = await Watchlist.find({user:req.user.id} && {typeOfContent:"movie"});
    res.json(user) 
  } catch (error) {
    res.send("Internal server error")
  }
})

// route 4: get All tvshows of watchlist
router.get('/getwatchlistS',fetchuser,async(req,res)=>{
  try {
    const user = await Watchlist.find({user:req.user.id} && {typeOfContent:"tv"});
    res.json(user) 
  } catch (error) {
    res.send("Internal server error")
  }
})


module.exports = router;