import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  const isSearchResultsPage = location.pathname === '/search-results';
  const [searchQuery, setSearchQuery] = useState('');
  const buttonText = isLoginPage ? 'Register' : 'Login';

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <nav className={`navbar navbar-light ${isSearchResultsPage ? 'isSearchResultsPage' : ''} ${isCollapsed ? 'isCollapsed' : ''}`}>
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
              <a className="navbar-brand m-3" href="#">
                ARELLANO LAW FOVNDATION
              </a>
            )}
          </div>
          <form className="d-flex">
            <Link to={isLoginPage ? '/register' : '/'} className="btn nav-btn btn-md">
              {buttonText}
            </Link>
          </form>
        </div>
      </nav>
      <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`} id="navbarToggleExternalContent">
        <div className="shadow-3 p-4">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                HOME
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
                ABOUT US
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">
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