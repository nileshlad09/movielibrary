import './review.css'
import React,{useContext, useState} from "react";
import WatchlistContext from '../../context/watchlist/WatchlistContext'
const Review = ({forceRefresh}) => {  
  const context = useContext(WatchlistContext)
  const {addReview} = context;
    const [note,setNote] = useState("");
    const add =(e)=>{
      e.preventDefault();
      addReview(note);
      forceRefresh();
      setNote("")  
    }
    const onChange=(e)=>{
       setNote(e.target.value)
    }

  return (
    <div className="review">
      <h1>Add Review</h1>
      <form className="addreview" onSubmit={add}>
      <textarea value={note} name="review" type="text" id="review" cols="60" rows="2" onChange={onChange}></textarea>
      <button className="btn btn-primary"  type="submit" >Submit</button>
      </form>
    </div>
    
  );
};

export default Review;
