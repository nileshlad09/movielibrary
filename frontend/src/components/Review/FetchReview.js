import React, { useContext, useEffect, useReducer,useState } from 'react'
import WatchlistContext from '../../context/watchlist/WatchlistContext'
import Review from './Review'
import ReviewItem from './ReviewItem'
const FetchReview = () => {
  const context = useContext(WatchlistContext)
  // const { reviewU} = context
  const [refesh, forceRefresh] = useReducer(x => x + 1, 0);
  const [reviewU,setReviewU]=useState([]);
  const host =process.env.REACT_APP_HOST || "http://localhost:7000";
  const getReview= async()=>{
    const response = await fetch(`${host}/api/review/getreview`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'movieId': localStorage.getItem("movieId")
      }
    });
    const json = await response.json()
    setReviewU(json)
  }
  useEffect(() => {
    getReview()
  }, [refesh])

  return (
    <>
      <Review forceRefresh={forceRefresh} />
      <div className="row my-3">
        <h2>Review</h2>
        <div className="container">
          {reviewU.length === 0 && "No Reviews to display"}
        </div>
        {reviewU.map((note) => {
          return (
            <div className="card m-2">
              <div className="card-body ">
                <div className="reviewCon">
                  <h5 className="card-title"><i className="fas fa-user"></i> {note.name}</h5>
                  <p className="card-text">{note.review}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default FetchReview
