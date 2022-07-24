import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cast from "../Other/Cast";
import FetchReview from "../Review/FetchReview";
import SimilarMovie from "../Other/SimilarMovie";

const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


const DetailOfMovie = () => {
  const id = localStorage.getItem("movieId");
  let API_URL = BASE_URL + `/movie/${id}?` + API_KEY;
  const [movies, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [providers, setProvider] = useState([]);
  const [providers2, setProvider2] = useState([]);
  const [providers3, setProvider3] = useState([]);
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
        if(data.belongs_to_collection!=null){
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

    //watch provider
    fetch(BASE_URL + `/movie/${id}/watch/providers?` + API_KEY)
      .then((res) => res.json())
      .then((data) => {
        let provider = data.results.IN;
        if (data.results) {
          setProvider(provider?.flatrate);
          setProvider2(provider?.buy);
          setProvider3(provider?.rent);
        }
      });

  }, []);
  return (
    <>
    <div className="detailofmovie2" style={{ backgroundImage: `url(${IMG_URL+movies.backdrop_path})`}}>   
      <div className=" detailofmovie" key={id}>
        <button className="btn btn-primary float-end  close" onClick={close}>
          Close
        </button>
        <h1 className="text-center overview-title">{movies.title}</h1>
        <p className="text-center">{movies.tagline}</p>
        <div className="row overview">
          <div className="col-lg-6">
            <h1 className="text-center ">Overview</h1>
            <p>{movies.overview}</p>
            <div className="other">
              <p>Status : {movies.status}</p>
              <p>
                Runtime : {Math.floor(movies.runtime / 60)}hour{" "}
                {movies.runtime % 60} min
              </p>
              <p>Genres: {genres}</p>
              <p>Release Date: {movies.release_date}</p>
            </div>
            <div className="provider">
              <h3>Where to Watch</h3>
              <div
                className="provider2"
              >
                <div
                  className="providers"
                  style={{
                    display: providers === undefined ? "none" : "block",
                  }}
                >
                  <h4>Watch Online</h4>
                  <div className="p1">
                    {providers != undefined ? (
                      providers.map((p) => {
                        return (
                          <div className="ott">
                            <img
                              src={IMG_URL + p.logo_path}
                              style={{
                                display:
                                  IMG_URL + p.logo_path ? "block" : "none",
                              }}
                              alt=""
                            />
                            <p className="provider-name">{p.provider_name}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="provider-name">currently not available</p>
                    )}
                  </div>
                </div>
                <div
                  className="providers"
                  style={{
                    display: providers2 === undefined ? "none" : "block",
                  }}
                >
                  <h4>Buy</h4>
                  <div className="p1">
                    {providers2 != undefined ? (
                      providers2.map((p) => {
                        return (
                          <div className="ott">
                            <img
                              src={IMG_URL + p.logo_path}
                              style={{
                                display:
                                  IMG_URL + p.logo_path ? "block" : "none",
                              }}
                              alt=""
                            />
                            <p className="provider-name">{p.provider_name}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="provider-name">currently not available</p>
                    )}
                  </div>
                </div>
                <div
                  className="providers"
                  style={{
                    display: providers3 === undefined ? "none" : "block",
                  }}
                >
                  <h4>Rent</h4>
                  <div className="p1">
                    {providers3 != undefined ? (
                      providers3.map((p) => {
                        return (
                          <div className="ott">
                            <img
                              src={IMG_URL + p.logo_path}
                              style={{
                                display:
                                  IMG_URL + p.logo_path ? "block" : "none",
                              }}
                              alt=""
                            />
                            <p className="provider-name">{p.provider_name}</p>
                          </div>
                        );
                      })
                    ) : (
                      <p className="provider-name">currently not available</p>
                    )}
                  </div>
                </div>
              </div>
              <p className="provider-name" style={{display:(providers===undefined && providers2===undefined && providers3===undefined)?"block":"none"}}>currently not available</p>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="trailer">
              <iframe
                width="560"
                height="315"
                src={"https://www.youtube.com/embed/" + trailer.key}
                name={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      
        <div className="row">
          <div className="col-lg-12">
              <SimilarMovie coll={coll}/>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <FetchReview />
          </div>
          <div className="col-lg-6">
            <Cast set="movie"/>
          </div>
        </div>
      </div>
      </div>  
    </>
  );
};

export default DetailOfMovie;
