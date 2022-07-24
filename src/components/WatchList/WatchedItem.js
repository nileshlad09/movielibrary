import React, { useEffect, useState,useContext } from "react";
import WatchlistContext from '../../context/watchlist/WatchlistContext'
import image from '../../Img/download.jpg'
import { useNavigate } from "react-router-dom";
const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const WatchedItem = (props) => {
  const navigate = useNavigate()
  const { movie,showAlert } = props;
  let API_URL = BASE_URL + `/movie/${movie.movieId}?` + API_KEY;
  const [movies, setMovie] = useState([]);
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  },[]);

  const context =  useContext(WatchlistContext)
  const {removeWatched} = context;
  

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
      <div className="movie">
        <img src={movies.poster_path?IMG_URL+movies.poster_path:image}  onClick={()=>{
              localStorage.setItem('movieId',movie.movieId)
              navigate('/knowmore')
            }} />
        <div className="movie-info">
          <div className="movie-name">
            <h3>{movies.original_title}</h3>
            <span className={voteColor()}>{movies.vote_average}</span>
          </div>
          <h4>{movies.release_date}</h4>
          <div className="buttons">
            <button className="watchlist" onClick={()=>{removeWatched(movie._id)
            showAlert("success","movie removed successfully")}}>
              Remove from Watched
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WatchedItem;
