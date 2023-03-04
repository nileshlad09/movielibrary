import React, { useContext } from "react";
import './movie.css'
import image from "../../Img/download.jpg";
import WatchlistContext from "../../context/watchlist/WatchlistContext";
import { useNavigate, Link } from "react-router-dom";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const MovieItem = (props) => {
  let navigate = useNavigate();
  const { movie, showAlert } = props;
  const context = useContext(WatchlistContext);
  const { addWatchlist } = context;

  const addWatchList = () => {
    addWatchlist(movie.id, movie.title?movie.title:movie.name, movie.title?'movie':'tv');
    showAlert("success", "movie added to watchlist");
  };
  

  const voteColor = () => {
    if (movie.vote_average >= 8) {
      return "green";
    } else if (movie.vote_average > 6 && movie.vote_average < 8) {
      return "orange";
    } else {
      return "red";
    }
  };
  console.log(movie);
  return (
    <>
      <div className="movie" key={movie.id}>
        <img
          src={movie.poster_path ? IMG_URL + movie.poster_path : image}
          onClick={() => {
            localStorage.setItem("movieId", movie.id);
            console.log(movie.id)
            navigate( (movie.title?"/movie":"/tv")+"/knowmore/" + movie.id);
          }}
        />
        <div className="movie-info">
          <div className="movie_info">
            <div className="movie-name">
              <h3>{movie.title?movie.title:movie.name}</h3>
            </div>
            <div className="releaseDate">
              {
                movie.release_date?
                <h4>{movie.release_date?movie.release_date.slice(0, 4):movie.release_date}</h4>
                :
                <h4>{movie.first_air_date?movie.first_air_date.slice(0, 4):movie.first_air_date}</h4>
              }
              <span className={voteColor()}>{movie.vote_average}</span>
            </div>
          </div>
          <div className="buttons">
            {!localStorage.getItem("token2") ? (
              <>
                <Link className="watchlist" to="/login">
                  <button>
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <button className="watchlist" onClick={addWatchList}>
                  <i className="fa-solid fa-bookmark"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieItem;
