import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './banar.css'
const Banar = (props) => {
  
  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const { movie } = props;
  let navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(movie);
  },[movie]);

  const length = data.slice(0, 3).length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };



  if (!Array.isArray(data) || data.length <= 0) {
    return null;
  }

  return (
    <section className='slider'>

      <i className='fas fa-arrow-left left-arrow' onClick={prevSlide} ></i>
      <i className='fas fa-arrow-right right-arrow' onClick={nextSlide} ></i>
      <div className="slider2">
        {data.map((slide, index) => {
          return (
            <>
            <div
              className={index === current ? 'slide active' : 'slide'}
              key={index}
            >
              {index === current && (
                <>
                  {/* <div className='sideBanar'>
                    <img src={IMG_URL + slide.poster_path} alt='Movie image' className='image' />
                  </div> */}
                  <img src={IMG_URL + slide.backdrop_path} alt='Movie image'
                  onClick={() => {
                    localStorage.setItem("movieId", slide.id);
                    navigate( (slide.title?"/movie":"/tv")+"/knowmore/" + slide.id);
                  }} className='image' />
                  <h3>{slide.title ? slide.title : slide.name}</h3>

                  {/* <div className='sideBanar'>
                  <img src={IMG_URL + slide.poster_path} alt='Movie image' className='image' />
                 </div> */}
                </>
              )}
              
            </div>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Banar;