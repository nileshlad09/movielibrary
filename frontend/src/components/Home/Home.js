import React, { useEffect, useState } from 'react'
import MovieItem from '../Movie/MovieItem';
import { Link } from 'react-router-dom';
import Banar from '../Banar/Banar';
import './home.css'
import Loader from '../Loader/Loader';

const Home = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  let API_URL;
  let number;
  const [movieNP, setMovieNP] = useState([]);
  const [movieUC, setMovieUC] = useState([]);
  const [movieTR, setMovieTR] = useState([]);

  const [tvNP, setTvNP] = useState([]);
  const [tvTR, setTvTR] = useState([]);
  const [isLoading, setLoader] = useState(true);

  const fetchFun = async (API_URL, number) => {
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (number == "now_playing") {
          setMovieNP(data.results);
          setLoader(false)
        }
        else if (number == "upcoming") {
          setMovieUC(data.results);
          setLoader(false)
        }
        else if (number == "top_rated") {
          setMovieTR(data.results);
          setLoader(false)
        }

      });
  };

  const fetchFun2 = async (API_URL, number) => {
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (number == "airing_today") {
          setTvNP(data.results);
          setLoader(false)
        }
        else if (number == "top_rated") {
          setTvTR(data.results);
          setLoader(false)
        }

      });
  };
  const data1 = [
    {
      name: "now_playing"
    },
    {
      name: "upcoming"
    },
    {
      name: "top_rated"
    }
  ]

  const data2 = [
    {
      name: "airing_today"
    },
    {
      name: "top_rated"
    }
  ]

  useEffect(() => {
    data1.forEach((i) => {
      API_URL =
        BASE_URL +
        `/movie/${i.name}?` +
        API_KEY
      fetchFun(API_URL, i.name);
    })

    data2.forEach((i) => {
      API_URL =
        BASE_URL +
        `/tv/${i.name}?` +
        API_KEY
      fetchFun2(API_URL, i.name);
    })

  }, []);
  return (
    <div className="homeSection container">
      {
        isLoading ? <>
          <Loader />
        </> :
          <>
            <Banar movie={movieNP} />
            <div className="homeSection-1">
              <div className='homeDeatil'>
                <h3>Now playing</h3>
                <p><Link to="/movie/now_playing">See All</Link></p>
              </div>
              <div className="Now-playing">
                {movieNP.length > 0 &&
                  movieNP.map((movie, index) => {
                    return (
                      index <= 9 ?
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                        /> : ""
                    )
                  })
                }
              </div>
            </div>
            <div className="homeSection-1">
              <div className='homeDeatil'>
                <h3>Upcoming</h3>
                <p> <Link to="/movie/upcoming">See All</Link></p>
              </div>
              <div className="Now-playing">
                {movieUC.length > 0 &&
                  movieUC.map((movie, index) => {
                    return (
                      index <= 9 ?
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                        /> : ""
                    )
                  })
                }
              </div>
            </div>
            <div className="homeSection-1">
              <div className='homeDeatil'>
                <h3>Top Rated</h3>
                <p><Link to="/movie/top_rated">See All</Link></p>
              </div>
              <div className="Now-playing">
                {movieTR.length > 0 &&
                  movieTR.map((movie, index) => {
                    return (
                      index <= 9 ?
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                        /> : ""
                    )
                  })
                }
              </div>
            </div>
            <div className="homeSection-1">
              <div className='homeDeatil'>
                <h3>Top Rated Tv show</h3>
                <p><Link to="/tv/top_rated">See All</Link></p>
              </div>
              <div className="Now-playing">
                {tvTR.length > 0 &&
                  tvTR.map((movie, index) => {
                    return (
                      index <= 9 ?
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                        /> : ""
                    )
                  })
                }
              </div>
            </div>
            <div className="homeSection-1">
              <div className='homeDeatil'>
                <h3>Airing Today</h3>
                <p><Link to="/tv/airing_today">See All</Link></p>
              </div>
              <div className="Now-playing">
                {tvNP.length > 0 &&
                  tvNP.map((movie, index) => {
                    return (
                      index <= 9 ?
                        <MovieItem
                          key={movie.id}
                          movie={movie}
                        /> : ""
                    )
                  })
                }
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default Home