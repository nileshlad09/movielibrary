import React, { useEffect, useState } from "react";
import MovieItem from "../Movie/MovieItem";
import TvshowItem from "./TvshowItem";

const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";

const Upcoming = (props) => {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [tpage, setTotalpage] = useState(1);
  const [movieN, setMovien] = useState("");
  const [currentDisplay, setCurrentDisplay] = useState("");
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
    if (movieN) {
      API_URL =
        BASE_URL + "/search/tv?" + API_KEY + `&query=${movieN}&page=${pageNo}`;
    } else {
      API_URL = BASE_URL + "/tv/popular?" + API_KEY + `&page=${pageNo}`;
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
    API_URL = BASE_URL + "/search/tv?" + API_KEY + `&query=${movieN}`;
    setCurrentDisplay(movieN);
    fetchFun(API_URL);
  };

  useEffect(() => {
    API_URL = BASE_URL + "/tv/popular?" + API_KEY + `&page=1`;
    fetchFun(API_URL);
  }, []);

  const nowPlaying = () => {
    API_URL = BASE_URL + "/tv/airing_today?" + API_KEY + `&page=1`;
    let now = 1;
    setCurrentDisplay("Now Playing");
    fetchFun(API_URL, now);
  };
  const popular = () => {
    API_URL = BASE_URL + "/tv/popular?" + API_KEY + `&page=1`;
    let now = 3;
    setCurrentDisplay("Popular");
    fetchFun(API_URL, now);
  };
  const topRated = () => {
    API_URL = BASE_URL + "/tv/top_rated?" + API_KEY + `&page=1`;
    let now = 4;
    setCurrentDisplay("Top Rated");
    fetchFun(API_URL, now);
  };

  const onchange = (e) => {
    e.preventDefault();
    setMovien(e.target.value);
  };

  return (
    <>
      <div className="main">
        <div className="nav2 ">
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
        <div className="movieContainer2">
          <h1>{currentDisplay}</h1>
          <div className="movieContainer">
            {movie.length > 0 &&
              movie.map((movie) => {
                return (
                  <TvshowItem
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
