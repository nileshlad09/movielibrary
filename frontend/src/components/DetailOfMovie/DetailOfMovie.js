import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Cast from "../Other/Cast";
import FetchReview from "../Review/FetchReview";
import SimilarMovie from "../Other/SimilarMovie";
import './detailofmovie.css'
import Trailer from "../Other/Trailer";
import Wheretowatch from "../Other/Wheretowatch";
import Overview from "../Other/Overview";



const DetailOfMovie = () => {
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const params = useParams();
  const movieid = params.id;
  const type = params.type;
  // const id = localStorage.getItem("movieId");
  let API_URL = BASE_URL + `/${type}/${movieid}?` + API_KEY;
  const [movies, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState("");
  
  const [coll, setColl] = useState([]);
  let Navigate = useNavigate();
  const close = () => {
    Navigate(-1);
  };



  useEffect(() => {
    //moviedata
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        if(data.seasons){
          setColl(data.seasons)
        }
        else if(data.belongs_to_collection!=undefined) {
          fetch(BASE_URL + `/collection/${data?.belongs_to_collection?.id}?` + API_KEY)
            .then((res) => res.json())
            .then((data) => {
              setColl(data.parts);
            });
        }
        var q = "";
        data.genres.forEach((data) => {
          q += data.name + " , ";
        });
        setGenres(q);
      });
    // trailer
    fetch(BASE_URL + `/${type}/` + movieid + `/videos?` + API_KEY)
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
        <div className=" detailofmovie" key={movieid}>
          <button className="btn btn-primary float-end close" onClick={close}>
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
          <h1 className="text-center overview-title">{movies.title?movies.title:movies.name}</h1>
          <p className="text-center">{movies.tagline}</p>
          <div className="row overview">
            <div className="col-lg-6">
              <h1 className="text-center ">Overview</h1>
              <p>{movies.overview}</p>
              <Overview type={type} movies={movies} genres={genres}/>
            </div>
            <div className="col-lg-6">
              <Trailer trailer={trailer}/>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Wheretowatch type={type} movieid={movieid}/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <SimilarMovie coll={coll} />
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <Cast type={type} movieid={movieid} />
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
