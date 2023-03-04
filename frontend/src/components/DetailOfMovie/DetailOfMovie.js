import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cast from "../Other/Cast";
import FetchReview from "../Review/FetchReview";
import SimilarMovie from "../Other/SimilarMovie";
import './detailofmovie.css'
import Trailer from "../Other/Trailer";
import Wheretowatch from "../Other/Wheretowatch";
const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


const DetailOfMovie = () => {
  const id = localStorage.getItem("movieId");
  let API_URL = process.env.REACT_APP_BASE_URL + `/movie/${id}?` + process.env.REACT_APP_API_KEY;
  console.log(API_URL)
  const [movies, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState("");
  
  const [coll, setColl] = useState([]);
  const [background, setBackground] = useState([]);
  let Navigate = useNavigate();
  const close = () => {
    Navigate("/");
  };



  useEffect(() => {
    //moviedata
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        if (data.belongs_to_collection != null) {
          fetch(BASE_URL + `/collection/${data?.belongs_to_collection?.id}?` + API_KEY)
            .then((res) => res.json())
            .then((data) => {
              setColl(data.parts);
              setBackground(data);
            });
        }
        var q = "";
        data.genres.forEach((data) => {
          q += data.name + " , ";
        });
        setGenres(q);
      });
    // trailer
    fetch(BASE_URL + `/movie/` + id + `/videos?` + API_KEY)
      .then((res) => res.json())
      .then((videoData) => {
        videoData.results.forEach((element) => {
          const { name, site, type } = element;
          if (site === "YouTube" && type === "Trailer") {
            setTrailer(element);
          }
        });
      });

    

  }, []);


  return (
    <>
      <div className="detailofmovie2" style={{ backgroundImage: `url(${IMG_URL + movies.backdrop_path})` }}>
        <div className=" detailofmovie" key={id}>
          <button className="btn btn-primary float-end close" onClick={close}>
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
          <h1 className="text-center overview-title">{movies.title}</h1>
          <p className="text-center">{movies.tagline}</p>
          <div className="row overview">
            <div className="col-lg-6">
              <h1 className="text-center ">Overview</h1>
              <p>{movies.overview}</p>
              <div className="other">
                <p>
                  Runtime : {Math.floor(movies.runtime / 60)}hour{" "}
                  {movies.runtime % 60} min
                </p>
                <p>Genres: {genres}</p>
                <p>Release Date: {movies.release_date}</p>
              </div>

            </div>
            <div className="col-lg-6">
              <Trailer trailer={trailer}/>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Wheretowatch/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <SimilarMovie coll={coll} />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <Cast set="movie" />
            </div>
            <div className="col-lg-6">
              <FetchReview />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOfMovie;
