import React ,{useContext,useEffect} from 'react'
import WatchlistContext from '../../context/watchlist/WatchlistContext';
import WatchlistItem from './WatchlistItem'

const WatchList = (props) => {
  const context = useContext(WatchlistContext)
    const {watchlist,getWatchlist} = context;
    const {showAlert}=props;
    
    useEffect(() => {
      getWatchlist() 
      console.log(watchlist);       
    },[]);

  return (
    <div className="movieContainer">
      {watchlist.map((movie) => {
          return (
             <WatchlistItem  key={movie._id} movie={movie} showAlert={showAlert}></WatchlistItem>
          );
        })}
    </div>
  )
}

export default WatchList;
