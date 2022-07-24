import React ,{useContext,useEffect} from 'react'
import WatchlistContext from './../../context/watchlist/WatchlistContext'
import WatchedItem from './WatchedItem'


const Watched = (props) => {
    const context = useContext(WatchlistContext)
    const {watched,getWatched} = context;
    const {showAlert} = props;
    useEffect(() => {
        getWatched();
        // eslint-disable-next-line
    },[]);
    

  return (
    <div className="movieContainer">
      {watched.map((movie) => {
          return (
             <WatchedItem key={movie.toString()} movie={movie} showAlert={showAlert}></WatchedItem>
          );
        })}
    </div>
  )
}

export default Watched;
