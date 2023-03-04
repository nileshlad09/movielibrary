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
import TvshowContainer from './components/Movie/TvshowContainer';
import Login from './components/Login/Login';
import Alert from './components/Alert';
import Review from './components/Review/Review';
import FetchReview from './components/Review/FetchReview';
import Home from './components/Home/Home';


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
    <Router>
        <Navbar/>
        <Alert alert={alert}/>
        <Routes>
          <Route path="/"   element={<Home  showAlert={showAlert} /> } />
          <Route path="/movie/:type"   element={<MovieContainer  showAlert={showAlert} /> } />
          <Route path="/tv/:name"   element={<TvshowContainer showAlert={showAlert}/>} />
          <Route path="/watchlist"  element={<WatchList showAlert={showAlert}/>} />
          <Route path="/:type/knowmore/:id" element={<DetailOfMovie/>} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/review" element={<Review/>} />
          <Route path="/review2" element={<FetchReview/>} />
        </Routes>
      </Router>
      </WatchlistState>
    </>
  );
}

export default App;
