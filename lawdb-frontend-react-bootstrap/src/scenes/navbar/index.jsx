// navbar 
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = ({ hostUrl }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';
  const isSearchResultsPage = location.pathname === '/search-results';

  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setIsLoggedIn(true);
    }
  }, [location]);

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

            <Link className="navbar-brand m-3" to="/">
              ARELLANO LAW FOUNDATION
            </Link>
          </div>

          <form className="d-flex">
            {isLoggedIn ? (
              <Link key="user-profile" to="/user-profile" className="btn btn-md usr-btn">
                <FontAwesomeIcon icon={faUser} className="user-icon" />
                {username}
              </Link>
            ) : (
              isLoginPage ? (
                <Link to="/register" className="btn btn-md nav-btn">
                  Register
                </Link>
              ) : (
                <Link to="/login" className="btn btn-md nav-btn">
                Login
              </Link>
              )
            )}
          </form>
          
        </div>
      </nav>

      <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`} id="navbarToggleExternalContent">
        <div className="shadow-3 p-4">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about-us">
                ABOUT US
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/disclaimer">
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