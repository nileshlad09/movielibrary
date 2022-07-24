import React, { useState, useEffect } from "react";
import CastDetail from "./CastDetail";

const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const Cast = (props) => {
  const [cast, setCast] = useState([]);
  const movieId = localStorage.getItem("movieId");
  const API_URL = BASE_URL + `/${props.set}/${movieId}/credits?` + API_KEY;
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCast(data.cast)
      });
  }, []);

  return (
    <div className="castContainer">
    <h1 className="text-center">Cast</h1>
    <div className="castDetail">
      { cast.length> 0 ? cast.slice(0, 16).map((data) => {
        return (
         <CastDetail key={data.id} data={data}></CastDetail> 
        )
      }):"Not"}
    </div>
    </div>
  );
};

export default Cast;
