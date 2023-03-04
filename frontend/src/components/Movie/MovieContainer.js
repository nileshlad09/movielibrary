import React, { useEffect, useState } from "react";
import Banar from "../Banar/Banar";
import MovieItem from "./MovieItem";
import { useNavigate, useParams } from "react-router-dom";
const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieContainer = (props) => {
  let navigate = useNavigate();

  const params = useParams();
  const movieName = params.type;

  const { showAlert } = props;
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [tpage, setTotalpage] = useState(1);
  const [movieN, setMovien] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("Now Playing");
  let pageNo = 1;
  let API_URL;

  const fetchFun = async (API_URL) => {
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
        setTotalpage(data.total_pages);
        setPage(data.page);
      });
  };
  const pageChange = async (pageNo) => {
    if (movieName == "now_playing") {
      API_URL = BASE_URL + "/movie/now_playing?" + API_KEY + `&page=${pageNo}`;
    }
    else if(movieName=="upcoming"){
      API_URL = BASE_URL + "/movie/upcoming?" + API_KEY + `&page=${pageNo}`;
    }
    else if(movieName=="popular"){
      API_URL = BASE_URL + "/movie/popular?" + API_KEY + `&page=${pageNo}`;
    }
    else if(movieName=="top_rated"){
      API_URL = BASE_URL + "/movie/top_rated?" + API_KEY + `&page=${pageNo}`;
    }
    else {
      API_URL =
      BASE_URL +
      "/search/movie?" +
      API_KEY +
      `&query=${movieName}&page=${pageNo}`;
    }

    fetchFun(API_URL); 
  };

  const nextBtn = () => {
    pageNo = page + 1;
    pageChange(pageNo);
  };

  const preBtn = () => {
    pageNo = page - 1;
    pageChange(pageNo);
  };


  const nowPlaying = () => {
    API_URL = BASE_URL + "/movie/now_playing?" + API_KEY + `&page=1`;
    setCurrentDisplay("Now Playing");
    navigate('/movie' + "/now_playing")
    fetchFun(API_URL);
  };
  const Upcoming = () => {
    API_URL = BASE_URL + "/movie/upcoming?" + API_KEY + `&page=1`;
    setCurrentDisplay("Upcoming");
    navigate('/movie' + "/upcoming")
    fetchFun(API_URL);
  };
  const popular = () => {
    API_URL = BASE_URL + "/movie/popular?" + API_KEY + `&page=1`;
    setCurrentDisplay("Popular");
    navigate('/movie' + "/popular")
    fetchFun(API_URL);
  };
  const topRated = () => {
    API_URL = BASE_URL + "/movie/top_rated?" + API_KEY + `&page=1`;
    setCurrentDisplay("Top Rated");
    navigate('/movie' + "/top_rated")
    fetchFun(API_URL);
  };

  const onchange = (e) => {
    e.preventDefault();
    setMovien(e.target.value);
  };

  const search = () => {
    API_URL = BASE_URL + "/search/movie?" + API_KEY + `&query=${movieN?movieN:movieName}`;
    setCurrentDisplay(movieN?movieN:movieName);
    navigate('/movie/' + (movieN?movieN:movieName))
    fetchFun(API_URL);
  };


  
  
  useEffect(() => {
    if (movieName == "now_playing") {
      nowPlaying();
    }
    else if(movieName=="upcoming"){
      Upcoming();
    }
    else if(movieName=="popular"){
       popular();
    }
    else if(movieName=="top_rated"){
      topRated();
    }
    else {
      search();
    }
  }, [movieName])





  return (
    <>
      <div className="main">
        <div className="nav2 container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-md-12">
              <div className="filter">
                <ul>
                  <li onClick={nowPlaying}>Now Playing</li>
                  <li onClick={Upcoming}>Upcoming</li>
                  <li onClick={popular}>Popular</li>
                  <li onClick={topRated}>Top Rated</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-md-12">
              <div className="d-flex movieSearch">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={onchange}
                />
                <button
                  disabled={movieN.length <= 0}
                  className="btn btn-dark"
                  type="submit"
                  onClick={search}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>

        <Banar movie={movie}></Banar>


        <div className="movieContainer2">
          <h1>{currentDisplay}</h1>
          <div className="movieContainer">
            {movie.length > 0 &&
              movie.map((movie) => {
                return (
                  <MovieItem
                    key={movie.id}
                    movie={movie}
                    showAlert={showAlert}
                  />
                );
              })}
            <h3
              style={{
                display: movie.length < 1 ? "block" : "none",
                color: "white",
              }}
            >
              Movie Not Found
            </h3>
          </div>
        </div>

        <div
          className="buttons container  justify-content-between my-3"
          style={{ display: movie.length < 1 ? "none" : "flex" }}
        >
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
            disabled={page >= tpage}
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
