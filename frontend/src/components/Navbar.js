import React from "react";
import { Link, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();

  const logout = () => {
    localStorage.clear("token2");
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
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/upcoming" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/tvshow"
                >
                  Tv Shows
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{
                    pointerEvents: localStorage.getItem("token2") ? 0 : "none",
                  }}
                  className={`nav-link ${
                    location.pathname === "/watchlist" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/watchlist"
                >
                  WatchList
                </Link>
              </li>
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
