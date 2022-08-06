const express = require('express')
const Review = require("../models/Review")
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();

// route 1: add review
router.post('/addreview',fetchuser,async (req,res)=>{
  try {
    const movie = req.header('movieId');
    const userId = req.user.id;
    const user =await User.findById(userId).select("-password");
    const review2 = await Review.create({
        user: req.user.id,
        name:user.name,
        movieId: movie,
        review: req.body.review
      });
      success=true
     res.status(200).json({review2});
  } catch (error) {
    return res.json(error);
  }
})

router.get('/getreview',async(req,res)=>{
  try {
    const movie = req.header('movieId');
    const review2 = await Review.find({movieId:movie});
    res.json(review2) 
  } catch (error) {
    res.send("Internal server error")
  }
})

module.exports = router