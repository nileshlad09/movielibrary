import React from 'react'

const Overview = (props) => {
    const {type,movies,genres}=props;
  return (
    <>
        {type=="movie"?
              <div className="other">
                <p>
                  Runtime : {Math.floor(movies.runtime / 60)}hour{" "}
                  {movies.runtime % 60} min
                </p>
                <p>Genres: {genres}</p>
                <p>Release Date: {movies.release_date}</p>
              </div>
              :
              <div className="other">
                <p>
                  No of Seasons : {movies.number_of_seasons}
                </p>
                <p>Genres: {genres}</p>
                <p>First Air Date: {movies.first_air_date}</p>
                <p>Last Air Date: {movies.last_air_date}</p>
              </div>
              }
    </>
  )
}

export default Overview