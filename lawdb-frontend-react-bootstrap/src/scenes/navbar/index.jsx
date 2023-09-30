// navbar
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../styles/general.css';
import '../../styles/navbar.css';

const Navbar = () => {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        
        <Link className="navbar-brand m-3" to="/">ARELLANO LAW FOVNDATION</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarDropdown"
          aria-controls="#navbarDropdown"
          aria-expanded={isNavbarCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isNavbarCollapsed ? '' : 'show'}`} id="navbarTogglerDemo01">
          
          
          
          <div className="navbar-nav me-auto mb-2 mb-lg-0" id="navbarDropdown">
            <ul className={`navbar-nav me-auto align-items-end ${isNavbarCollapsed ? 'flex-column' : ''}`}>
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
            </ul>
          </div>

        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
