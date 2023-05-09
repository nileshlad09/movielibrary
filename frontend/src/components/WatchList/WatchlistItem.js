import React, { useEffect, useState,useContext } from "react";
import WatchlistContext from './../../context/watchlist/WatchlistContext'
import image from '../../Img/download.jpg'
import { useNavigate } from "react-router-dom";



const WatchlistItem = (props) => {
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate()
  const {movie,showAlert}=props;
  
  let  API_URL = BASE_URL + `/${movie.typeOfContent}/${movie.movieId}?` + API_KEY;
    
  const [movies, setMovie] = useState([]);
    useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  },[]);

  const context =  useContext(WatchlistContext)
  const {removeWatchlist,removeWatchlistS,setMoviedetail} = context;
  

  const voteColor=()=>{
    if(movies.vote_average>=8){
      return 'green'
    }
    else if(movies.vote_average>6 && movies.vote_average<8){
      return 'orange'
    }
    else{
      return 'red'
    }
  }
  
  return (
    <>
      <div className="movie" key={movie.id}>
        <img
          src={movies.poster_path ? IMG_URL + movies.poster_path : image}
          onClick={() => {
            localStorage.setItem("movieId", movies.id);
            setMoviedetail(movies.id)
            if(movie.typeOfContent==='movie'){
              navigate("/knowmore");
            }
            else{
              navigate("/knowmoreShow");
            }
          }}
        />
        <div className="movie-info">
          <div className="movie_info">
            <div className="movie-name">
              <h3>{movies.title?movies.title:movies.name}</h3>
            </div>
            <div className="releaseDate">
              <h4>{movies.release_date?movies.release_date.slice(0, 4):movies.release_date}</h4>
              <span className={voteColor()}>{movies.vote_average}</span>
            </div>
          </div>
          <div className="buttons">
          <button className="watchlist" onClick={()=>{
              if(movie.typeOfContent==='movie'){
                removeWatchlist(movie._id)  
              }
              else{
                removeWatchlistS(movie._id)  
              }
              showAlert("success",`${movies.original_title?movies.original_title:movies.name} movie removed successfully`)}}>
              <i className="far fa-bookmark"></i>
            </button>

          </div>
        </div>
      </div>




    </>
  );
};

export default WatchlistItem;
