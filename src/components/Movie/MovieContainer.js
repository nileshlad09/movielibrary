import React, { useEffect, useState } from "react";
import MovieItem from "./MovieItem";

const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";


const MovieContainer = (props) => {
  const{ showAlert} = props;
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [tpage, setTotalpage] = useState(1);
  const [current, setCurrent] = useState(1);
  const [movieN, setMovien]= useState("")
  const [currentDisplay, setCurrentDisplay]= useState("")
  let pageNo = 1;
  let API_URL; 
  

  const fetchFun= async(API_URL, now)=>{
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
        setCurrent(now)
        setTotalpage(data.total_pages);
        setPage(data.page);
      });
  }
  const pageChange= async(pageNo)=>{
    if(movieN){
      API_URL = BASE_URL + "/search/movie?" + API_KEY + `&query=${movieN}&page=${pageNo}`;  
    }
    else if(current===1){
     API_URL =BASE_URL +"/movie/now_playing?" + API_KEY +`&page=${pageNo}`;
    }
    else if(current===2){
     API_URL =BASE_URL +"/movie/upcoming?" + API_KEY +`&page=${pageNo}`;
    }
    else if(current===3){
     API_URL =BASE_URL +"/movie/popular?" + API_KEY +`&page=${pageNo}`;
    }
    else if(current===4){
     API_URL =BASE_URL +"/movie/top_rated?" + API_KEY +`&page=${pageNo}`;
    }
    else {
      API_URL =BASE_URL +"/discover/movie?sort_by=popularity.desc&" + API_KEY +`&page=${pageNo}`;
     }
    fetchFun(API_URL)
  }

  const nextBtn = () => {
    pageNo = page + 1;
    pageChange(pageNo)
  };

  const preBtn = () => {
    pageNo = page - 1;
    pageChange(pageNo)
  };

  const search =() => {
      API_URL = BASE_URL + "/search/movie?" + API_KEY + `&query=${movieN}`;
      setCurrentDisplay(movieN)
      fetchFun(API_URL)
  };


  useEffect(() => {    
     API_URL =
     BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY + `&page=1`;
     fetchFun(API_URL)
  }, []);

  const nowPlaying =()=>{
    API_URL =
    BASE_URL + "/movie/now_playing?" + API_KEY + `&page=1`;
    let now= 1;
    setCurrentDisplay('Now Playing')
    fetchFun(API_URL, now)
  }
  const Upcoming =()=>{
    API_URL =
    BASE_URL + "/movie/upcoming?" + API_KEY + `&page=1`;
    let now= 2;
    setCurrentDisplay('Upcoming')
    fetchFun(API_URL, now)
  }
  const popular =()=>{
    API_URL =
    BASE_URL + "/movie/popular?" + API_KEY + `&page=1`;
    let now= 3;
    setCurrentDisplay('Popular')
    fetchFun(API_URL, now)
  }
  const topRated=()=>{
    API_URL =
    BASE_URL + "/movie/top_rated?" + API_KEY + `&page=1`;
    let now= 4;
    setCurrentDisplay('Top Rated')
    fetchFun(API_URL, now)
  }

  
  const onchange = (e) =>{
    e.preventDefault()
    setMovien(e.target.value);
  }


  return (
    <>
    <div className="main">
      <div className="nav2 d-flex justify-content-between" >
        <div className="filter">
          <ul>
            <li onClick={nowPlaying}>Now Playing</li>
            <li onClick={Upcoming}>Upcoming</li>
            <li onClick={popular}>Popular</li>
            <li onClick={topRated}>Top Rated</li>
          </ul>
        </div>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={onchange}
          />
          <button disabled={movieN.length<=0} className="btn btn-dark"  type="submit" onClick={search}>
            Search
          </button>
        </div>
      </div>


      <div className="movieContainer2">
        <h1>{currentDisplay}</h1> 
        <div className="movieContainer">
        {movie.length > 0 &&
          movie.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} showAlert={showAlert}/>;
          })}
           <h3 style={{display:(movie.length<1)?"block":"none",color:"white"}}>Movie Not Found</h3>
      </div>
      </div>

      <div className="buttons container  justify-content-between my-3" style={{display:(movie.length<1)?"none":"flex"}} >
        <button
          disabled={page === 1}
          className="btn btn-dark d-flex align-items-center"
          onClick={preBtn}
        >
          <i className="fas fa-arrow-left"></i>pre
        </button>
        <p>
          {page}/{tpage}
        </p>
        <button
          disabled={page >=tpage }
          className="btn btn-dark  d-flex align-items-center"
          onClick={nextBtn}
        >
          next <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
    </>
  );
};

export default MovieContainer;
