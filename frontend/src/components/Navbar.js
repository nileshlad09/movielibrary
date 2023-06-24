import React from "react";
import { Link, useLocation } from "react-router-dom";
import './navbar.css'
import { useContext } from "react";
import { UserContext } from "../App";
const Navbar = () => {
  const location = useLocation();


  const {state,dispatch} = useContext(UserContext)
  const logout = () => {
    localStorage.clear("token2");
    dispatch({type:"USER",payload:false});
  };



  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            MovieLibrary
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/movie/now_playing" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/movie/now_playing"
                >
                  Movie
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/tv/airing_today" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/tv/airing_today"
                >
                  Tv Shows
                </Link>
              </li>
             {state?
             <li className="nav-item">
             <Link
               className={`nav-link ${
                 location.pathname === "/watchlist" ? "active" : ""
               }`}
               aria-current="page"
               to="/watchlist"
             >
               WatchList
             </Link>
             </li>:<></>
             } 
            </ul>
            {!localStorage.getItem("token2") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              </form>
            ) : (
              <Link
                className="btn btn-primary mx-2"
                to="/login"
                onClick={logout}
                role="button"
              >
                logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
