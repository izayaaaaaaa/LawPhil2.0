// navbar
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = ({ hostUrl }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [role, setRole] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userId = localStorage.getItem('id');
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) {
      setIsLoggedIn(true);
      setRole(localStorage.getItem('role'));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    Navigate('/login');
  };

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded={!isNavbarCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarTogglerDemo01">
          <Link className="navbar-brand m-3" to="/">
            ARELLANO LAW FOVNDATION
          </Link>
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <ul className={`navbar-nav me-auto ${isNavbarCollapsed ? 'flex-column' : ''}`}>
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
          <form className="d-flex nav-usr">
            {isLoggedIn ? (
              <div className="dropdown">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle usr-btn"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {localStorage.getItem('username')}
                  </button>
                  <div className="dropdown-menu" aria-labelledby="userRoleDropdown">
                    <Link className="dropdown-item" to={`/user-profile/${userId}`}>
                      User Profile
                    </Link>
                    {role === 'admin' && (
                      <Link className="dropdown-item" to="/admin-dashboard">
                        Admin Dashboard
                      </Link>
                    )}
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
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
      </div>
    </nav>
  );
};

export default Navbar;
