import './App.css';
import { useState } from 'react';
import MovieContainer from './components/Movie/MovieContainer';
import WatchList from './components/WatchList/WatchList';
import Navbar from './components/Navbar';
import WatchlistState from './context/watchlist/WatchlistState'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DetailOfMovie from './components/DetailOfMovie/DetailOfMovie';
import DetailOfShow from './components/DetailOfShow/DetailOfShow';
import TvshowContainer from './components/TvShows/TvshowContainer';
import Login from './components/Login/Login';
import Alert from './components/Alert';
import Review from './components/Review/Review';
import FetchReview from './components/Review/FetchReview';
import Home from './components/Home/Home';
import MovieState from './context/watchlist/MovieState';


function App() {
  const[alert,setAlert]=useState(null);
  const  showAlert=(type,message)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  
  return (
    <>
    <WatchlistState>
      <MovieState>
    <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <Routes>
          <Route path="/"   element={<Home  showAlert={showAlert} /> } />
          <Route path="/movie"   element={<MovieContainer  showAlert={showAlert} /> } />
          <Route path="/tvshow"   element={<TvshowContainer showAlert={showAlert}/>} />
          <Route path="/watchlist"  element={<WatchList showAlert={showAlert}/>} />
          <Route path="/knowmore" element={<DetailOfMovie/>} />
          <Route path="/knowmoreShow" element={<DetailOfShow/>} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/review2" element={<FetchReview/>} />
        </Routes>
      </Router>
      </MovieState>
      </WatchlistState>
    </>
  );
}

export default App;
