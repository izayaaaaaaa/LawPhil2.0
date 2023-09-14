// navbar 
// to do:
// - After successfully logging in and being redirected to /search, (sessions or cookies check which is most suited for this use case)
//    the user's name should be shown on the upper right as a button that redirects to their respective profile page
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  // to display search bar when on search results page
  const isSearchResultsPage = location.pathname === '/search-results';
  const [searchQuery, setSearchQuery] = useState('');

  // to change the button text depending on the page
  const buttonText = isLoginPage ? 'Register' : 'Login';
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <nav className={`navbar navbar-light bg-light ${isSearchResultsPage ? 'isSearchResultsPage' : ''} ${isCollapsed ? 'isCollapsed' : ''}`}>
        <div className="container-fluid">
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent"
              aria-expanded={isCollapsed ? 'true' : 'false'}
              aria-label="Toggle navigation"
              onClick={handleToggleCollapse}
            >
              {isCollapsed ? (
                <FontAwesomeIcon icon={faTimes} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>
            {isSearchResultsPage ? (
              <div className="search-bar">
                <form action="" className="search-form">
                  <div className="form-group has-feedback">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control search-form-control"
                        placeholder="Search Keywords"
                        aria-label="Search Bar"
                        value={searchQuery}
                        onChange={handleInputChange}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn search-btn"
                          onClick={() => {
                            window.location.href = `/search-results?q=${searchQuery}`;
                          }}
                        >
                          <FontAwesomeIcon icon={faSearch} />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <a className="navbar-brand m-3" href="https://lawphil.net/">
                ARELLANO LAW FOVNDATION
              </a>
            )}
          </div>
          <form className="d-flex">
            {isLoggedIn ? (
              <Link to="/user-profile" className="btn btn-md usr-btn">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                {username}
              </Link>
            ) : (
              <Link to={isLoginPage ? '/register' : '/'} className="btn btn-md nav-btn">
                {buttonText}
              </Link>
            )}
          </form>
        </div>
      </nav>
      <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`} id="navbarToggleExternalContent">
        <div className="shadow-3 p-4">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="https://lawphil.net/">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="https://lawphil.net/">
                ABOUT US
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="https://lawphil.net/">
                DISCLAIMER
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;