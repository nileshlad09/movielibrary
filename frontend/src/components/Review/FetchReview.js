import React, { useContext, useEffect,useReducer } from 'react'
import WatchlistContext from '../../context/watchlist/WatchlistContext'
import Review from './Review'
import ReviewItem from './ReviewItem'
const FetchReview = () => {
  const context = useContext(WatchlistContext)
  const {reviewU,getReview}= context
  const [refesh, forceRefresh] = useReducer(x => x + 1, 0);

  useEffect(()=>{
    getReview()
    console.log("getreview called")
  },[refesh])

  return (
    <>
    <Review forceRefresh={forceRefresh}/>
    <div className="row my-3">
        <h2>Review</h2>
        <div className="container">
          {reviewU.length===0 && "No Reviews to display"}
        </div>
        {reviewU.map((note) => {
          console.log(note)
          return (
             <ReviewItem key={note._id} note={note} />
          );
        })}
      </div>
    </>
  )
}

export default FetchReview
