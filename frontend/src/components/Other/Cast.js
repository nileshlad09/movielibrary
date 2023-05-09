import React, { useState, useEffect } from "react";
import CastDetail from "./CastDetail";




const Cast = (props) => {
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [cast, setCast] = useState([]);
  const API_URL = BASE_URL + `/${props.type}/${props.movieid}/credits?` + API_KEY;
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
