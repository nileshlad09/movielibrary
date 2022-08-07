import React,{useContext, useState} from "react";
import WatchlistContext from '../../context/watchlist/WatchlistContext'

const Review = () => {  
  const context = useContext(WatchlistContext)
  const {addReview} = context;
    const [note,setNote] = useState("");
    const add =(e)=>{
      addReview(note);
        setNote("")
        
    }
    const onChange=(e)=>{
       setNote(e.target.value)
    }

  return (
    <div className="review">
      <h1>Add Review</h1>
      <form>
      <textarea value={note} name="review" type="text" id="review" cols="60" rows="2" onChange={onChange}></textarea>
      <button className="btn btn-primary" type="submit" onClick={add}>Submit</button>
      </form>
    </div>
    
  );
};

export default Review;
