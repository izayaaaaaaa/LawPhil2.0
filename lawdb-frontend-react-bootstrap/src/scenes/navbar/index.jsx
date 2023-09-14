// navbar 
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useLocation } from 'react-router-dom';

// Import Bootstrap's CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = ({ hostUrl }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const isLoginPage = location.pathname === '/login';
  const isSearchResultsPage = location.pathname === '/search-results';

  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const userId = localStorage.getItem('id');
  
  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('role'));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('username'); // Remove the stored username
    localStorage.removeItem('role'); // Remove the stored user role
    localStorage.removeItem('id'); // Remove the stored user id

    Navigate('/login');
  };

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
              <Link className="navbar-brand m-3" to="/">
                ARELLANO LAW FOVNDATION
              </Link>
            )}
          </div>

          <form className="d-flex">
            {isLoggedIn ? (
              <div className="dropdown">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {localStorage.getItem('username')}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="userRoleDropdown">
                    <Link className="dropdown-item" to={`/user-profile/${userId}`}>User Profile</Link>
                    {role === 'admin' && (
                      <Link className="dropdown-item" to="/admin-dashboard">Admin Dashboard</Link>
                    )}
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                </div>
              </div>
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