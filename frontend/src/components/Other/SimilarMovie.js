import React from 'react'

import image from "../../Img/download.jpg";
const IMG_URL = "https://image.tmdb.org/t/p/w500";


const SimilarMovie = (props) => {
  const {coll}=props;
  console.log(coll)
  return (
    <div style={{display:(coll.length==0)?"none":"block"}} key={coll.id}>
             <h2>Similar movies</h2>
             <div className='similar_movie'>
         {coll.map((movie)=>{
            return( <div className="card" key={movie.id} >
              <img src={movie.poster_path? (IMG_URL+movie.poster_path): image} className="card-img-top"/>
                    <div className="card-body">
                        {(movie.original_title===movie.title)?
                        <p className="card-text">{movie.title?movie.title:movie.name}</p>:
                        <p className="card-text">{movie.title} ({movie.original_title})</p>}
                        {movie.episode_count?<p className="card-text">No of Episode: {movie.episode_count}</p>:""}                     
                        <p className='release_date'>
                          {movie.release_date?movie.release_date.slice(0,4):movie.air_date}</p>
                    </div>
             </div>
            )
        })}
        </div>
    </div>
  )
}

export default SimilarMovie
