const express = require('express')
const Watched = require("../models/Watched")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();

// route 1: add movie to watchlist
router.post('/addwatched',fetchuser,async (req,res)=>{
  try {
    const movie = await Watched.create({
        user: req.user.id,
        movieId: req.body.movieId,
        movieName: req.body.movieName
      });
      res.send(movie);
  } catch (error) {
    res.send("internal server error")
  }
})

// route 2: delete movies from watchlist
router.delete('/deletewatched/:id',fetchuser,async(req,res)=>{
  try {
    movie = await Watched.findById(req.params.id);
    console.log(movie)
    if(!movie){
      res.status(404).send("Not found")
    }
    if(movie.user.toString() !== req.user.id){
      return res.status(401).send("Not allowed");
    }   
    movie = await Watched.findByIdAndDelete(req.params.id);
    res.send(movie)
    
  } catch (error) {
    console.error(error.message);
    res.send("internal server error")
  }
})

// route 3: get All movies of watchlist
router.get('/getwatched',fetchuser,async(req,res)=>{
  try {
    const user = await Watched.find({user:req.user.id});
    res.json(user) 
  } catch (error) {
    res.send("internal server error")
  }
})

module.exports = router;