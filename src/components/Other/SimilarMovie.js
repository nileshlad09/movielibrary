import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const API_KEY = "api_key=caa67a8e6595552254dc5543bf0720a7";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


const SimilarMovie = (props) => {
  const {coll}=props;
  console.log(coll);
  return (
    <div style={{display:(coll.length==0)?"none":"block"}}>
             <h2>Similar movies</h2>
             <div className='similar_movie'>
         {coll.map((movie)=>{
            return( <div className="card" key={movie.id} >
              <img src={movie.backdrop_path?(IMG_URL+movie.backdrop_path):(IMG_URL+movie.poster_path)} className="card-img-top"/>
                    <div className="card-body">
                        {(movie.original_title===movie.title)?<p className="card-text">{movie.title?movie.title:movie.name}</p>:<p className="card-text">{movie.title} ({movie.original_title})</p>}
                        <p className="card-text" display={movie.episode_count?"block":"none"}>No of Episode: {movie.episode_count}</p>                     
                        <p className='release_date'>{movie.release_date?movie.release_date.slice(0,4):movie.air_date}</p>
                    </div>
             </div>
            )
        })}
        </div>
    </div>
  )
}

export default SimilarMovie
