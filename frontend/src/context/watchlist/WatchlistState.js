import { useState } from "react";
import WatchlistContext from "./WatchlistContext";

const WatchlistState = (props)=>{

    const host ="http://localhost:5000"
    const noteInitial = []
    const [watchlist ,setWatchlist]= useState(noteInitial)
    const [watchlistS ,setWatchlistS]= useState(noteInitial)

    const getWatchlistM= async()=>{
        const response = await fetch(`${host}/api/watchlist/getwatchlistM`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token2')
          }
        });
        const json = await response.json()
        setWatchlist(json)
    }
    const getWatchlistS= async()=>{
        const response = await fetch(`${host}/api/watchlist/getwatchlistS`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token2')
          }
        });
        const json = await response.json()
        setWatchlistS(json)
      }

      const addWatchlist= async (movieId,movieName,typeOfContent)=>{
        const response = await fetch(`${host}/api/watchlist/addwatchlist`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token2')
          },
          body: JSON.stringify({movieId,movieName,typeOfContent})
        });
        const json = await response.json()
        console.log(json);
        setWatchlist(watchlist.concat(json))
        }
         
      const removeWatchlist = async (id)=>{
        const response = await fetch(`${host}/api/watchlist/deletewatchlist/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token2')
          }
        });
        const json = await response.json()
        const newmovie = watchlist.filter((movie)=>{return movie._id!==id});
        setWatchlist(newmovie)
      }

      const removeWatchlistS = async (id)=>{
        const response = await fetch(`${host}/api/watchlist/deletewatchlist/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token2')
          }
        });
        const json = await response.json()
        console.log(id);
        const newmovie = watchlistS.filter((movie)=>{return movie._id!==id});
        setWatchlistS(newmovie)
      }

    
      const [reviewU,setReviewU]=useState([]);
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


      const addReview= async (review)=>{
        const response = await fetch(`${host}/api/review/addreview`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token2'),
            'movieId':localStorage.getItem("movieId")
          },
          body: JSON.stringify({review})
        });
        const json = await response.json()
        setReviewU(reviewU.concat(json))
        }

        
        
        
          
        
        

    return (
        <WatchlistContext.Provider value={{watchlist,watchlistS,getWatchlistM,getWatchlistS,addWatchlist,removeWatchlist,removeWatchlistS,reviewU,addReview,getReview}}>
            {props.children}
        </WatchlistContext.Provider>
    );
}
export default WatchlistState