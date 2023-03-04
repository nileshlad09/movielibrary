import React, { useEffect, useState} from "react";
import Banar from "../Banar/Banar";
import { useNavigate, useParams } from "react-router-dom";
import MovieItem from "./MovieItem";
const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";

const Upcoming = (props) => {
  let navigate = useNavigate();
  const params = useParams();
  const movieName = params.name;
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [tpage, setTotalpage] = useState(1);
  const [movieN, setMovien] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("Airing Today");
  const { showAlert } = props;
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
    if (movieName == "airing_today") {
      API_URL = BASE_URL + "/tv/airing_today?" + API_KEY + `&page=${pageNo}`;
    }
    else if(movieName=="popular"){
      API_URL = BASE_URL + "/tv/popular?" + API_KEY + `&page=${pageNo}`;
    }
    else if(movieName=="top_rated"){
      API_URL = BASE_URL + "/tv/top_rated?" + API_KEY + `&page=${pageNo}`;
    }
    else {
      API_URL =
        BASE_URL + "/search/tv?" + API_KEY + `&query=${movieN}&page=${pageNo}`;
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

  const search = () => {
    API_URL = BASE_URL + "/search/tv?" + API_KEY + `&query=${movieN?movieN:movieName}`;
    setCurrentDisplay(movieN?movieN:movieName);
    navigate('/tv/' + (movieN?movieN:movieName))
    fetchFun(API_URL);
  };


  const nowPlaying = () => {
    API_URL = BASE_URL + "/tv/airing_today?" + API_KEY + `&page=1`;
    setCurrentDisplay("Now Playing");
    navigate('/tv' + "/airing_today")
    fetchFun(API_URL);
  };
  const popular = () => {
    API_URL = BASE_URL + "/tv/popular?" + API_KEY + `&page=1`;
    setCurrentDisplay("Popular");
    navigate('/tv' + "/popular")
    fetchFun(API_URL);
  };
  const topRated = () => {
    API_URL = BASE_URL + "/tv/top_rated?" + API_KEY + `&page=1`;
    setCurrentDisplay("Top Rated");
    navigate('/tv' + "/top_rated")
    fetchFun(API_URL);
  };

  const onchange = (e) => {
    e.preventDefault();
    setMovien(e.target.value);
  };
 
  useEffect(() => {
    if (movieName == "airing_today") {
      nowPlaying();
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
                  <li onClick={nowPlaying}>Airing Today</li>
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
              Series Not Found
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

export default Upcoming;
