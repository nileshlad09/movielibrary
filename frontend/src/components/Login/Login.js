import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './login.css'
import Signup from "./Signup";
import LoginMain from "./LoginMain";


const Login = (props) => {

  const IMG_URL = process.env.REACT_APP_IMG_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const {showAlert} = props;

  const [movie, setMovie] = useState([]);
  const fetchFun = async (API_URL) => {
    await fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  };
  const API_URL = BASE_URL + "/movie/now_playing?" + API_KEY;
  useEffect(() => {
    fetchFun(API_URL);
  }, []);

  const [current, setCurrent] = useState(0);


  const length = movie.slice(0, 3).length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  setInterval(()=>{
       nextSlide();
  },6000)

  

  const [islogin,setLogin] = useState(true);

  return (
    <>
      <div className="login_container container">
        <div className="row container">
          <div className="col-md-6 login_left">
            {movie.map((slide, index) => {
              return (
                <div
                  className={index === current ? 'slide active' : 'slide'}
                  key={index}
                >
                  {index === current && (
                    <>
                      <img src={IMG_URL + slide.poster_path} alt='Movie image' className='image' />
                    </>
                  )}
                </div>

              );
            })}


        </div>
        <div className="col-md-6">
          {islogin ?
           <LoginMain setLogin={setLogin} showAlert={showAlert}/> :
          <Signup setLogin={setLogin} showAlert={showAlert}/>
          }
          
        </div>
      </div>

    </div>



    </>
  );
};

export default Login;
