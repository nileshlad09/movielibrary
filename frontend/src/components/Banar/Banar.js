import React, { useState } from 'react';
import './banar.css'
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const Banar = (props) => {

    const {movie} = props;
  const [current, setCurrent] = useState(0);
  

  const  length = movie.slice(0,3).length
  

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  
  

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(movie) || movie.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>

      <i className='fas fa-arrow-left left-arrow' onClick={prevSlide} ></i>
      <i className='fas fa-arrow-right right-arrow' onClick={nextSlide} ></i>
      <div className="slider2">
      {movie.map((slide, index) => {
        return (
          <div
            className={index === current ? 'slide active' : 'slide'}
            key={index}
          >
            {index === current && (
                <>
              <img src={IMG_URL + slide.backdrop_path} alt='Movie image' className='image'/>
              <h1>{slide.title?slide.title:slide.name}</h1>
              </>
            )}
          </div>
          
        );
      })}
      </div>
    </section>
  );
};

export default Banar;