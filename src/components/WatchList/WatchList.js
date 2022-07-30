import React, { useContext, useEffect } from "react";
import WatchlistContext from "../../context/watchlist/WatchlistContext";
import WatchlistItem from "./WatchlistItem";

const WatchList = (props) => {
  const context = useContext(WatchlistContext);
  const { watchlist, watchlistS, getWatchlistM, getWatchlistS } = context;
  const { showAlert } = props;
  console.log(watchlist.length);

  useEffect(() => {
    getWatchlistM();
    getWatchlistS();
  }, []);

  return (
    <div className="movieContainer2">
    <div className="movieContainer3">
      <div className="movie3">
        <div className="title">
        <h1>Movie</h1>
        </div>
        <div className="movieItems">
        {  watchlist.map((movie) => {
          
          return (
            <WatchlistItem
              key={movie._id}
              movie={movie}
              showAlert={showAlert}
            ></WatchlistItem>
          );
        })}
        {
          watchlist.length<1 && 
          <h4>No Movie Found</h4>
        }
        
        </div>
      </div>
      <div className="tv mt-4">
        <div className="title">
        <h1>Tv Shows</h1>
        </div>
        <div className="movieItems">
        {watchlistS.map((movie) => {
          return (
            <WatchlistItem
              key={movie._id}
              movie={movie}
              showAlert={showAlert}
            ></WatchlistItem>
          );
        })}
        {
          watchlistS.length<1 && 
          <h4>No tv show Found</h4>
        }
        </div>
      </div>
    </div>
    </div>
  );
};

export default WatchList;
